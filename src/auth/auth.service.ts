import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';

import { UserService } from '../user/user.service';
import { TenantService } from '../tenant/tenant.service';

import { RegisterDto } from './dto/register.dto'; // or name it RegisterDto
import { LoginDto } from './dto/login.dto';

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UserService,
    private readonly tenantService: TenantService,
    private readonly jwtService: JwtService,
  ) {}

  async register(signupDto: RegisterDto) {
    const { businessName, ownerName, email, password, domain } = signupDto;

    // ✅ 1. Create Tenant
    const tenant = await this.tenantService.createTenant({
      name: businessName,
      domain: domain,
      email: email,
    });

    // ✅ 2. Hash Password
    const hashedPassword = await bcrypt.hash(password, 10);

    // ✅ 3. Create User linked to Tenant
    const user = await this.userService.createUser({
      tenantId: tenant.id,
      name: ownerName,
      email,
      password: hashedPassword,
      role: 'admin',
    });

    // ✅ 4. Generate JWT Token for User
    const payload = {
      sub: user.id,
      tenantId: tenant.id,
      email: user.email,
    };

    const token = await this.jwtService.signAsync(payload);

    // ✅ 5. Return token + details
    return {
      message: 'Signup successful',
      access_token: token,
    };
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

    return {
      message: 'Login successful',
      access_token: token,
    };
  }
}
