import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { UserService } from '../user/user.service';
import { TenantService } from '../tenant/tenant.service';
import { SignupDto } from './dto/signup.dto';
import { LoginDto } from './dto/login.dto';

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UserService,
    private readonly tenantService: TenantService,
    private readonly jwtService: JwtService,
  ) {}

  async register(signupDto: SignupDto) {
    const { businessName, ownerName, email, password, domain } = signupDto;

    const tenant = await this.tenantService.createTenant({
      name: businessName,
      domain: domain,
    });

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await this.userService.createUser({
      tenantId: tenant.id,
      name: ownerName,
      email,
      password: hashedPassword,
      role: 'admin',
    });

    return { message: 'Signup successful', tenant, user };
  }

  async login(loginDto: LoginDto) {
    const { email, password } = loginDto;

    const user = await this.userService.findByEmail(email);
    if (!user) throw new UnauthorizedException('Invalid credentials');

const passwordValid = await bcrypt.compare(password, user.password || '');
    if (!passwordValid) throw new UnauthorizedException('Invalid credentials');

    const payload = {
      sub: user.id,
      tenantId: user.tenantId,
      email: user.email,
    };

    const token = await this.jwtService.signAsync(payload);

    return { access_token: token };
  }
}
