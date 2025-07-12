import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Query,
  UseGuards,
  Req,
} from '@nestjs/common';
import { TenantService } from './tenant.service';
import { Tenant } from './tenant.entity';
import { AuthGuard } from '@nestjs/passport';
import { Request } from 'express';
import { CreateTenantDto } from './dto/create-tenant.dto';

interface AuthenticatedRequest extends Request {
  user: any; // Optional: refine with your JWT payload shape
}

@Controller('tenants')
export class TenantController {
  constructor(private readonly tenantService: TenantService) {}

  // ✅ Create a single Tenant
  @Post('single')
  createOne(@Body() createTenantDto: CreateTenantDto): Promise<Tenant> {
    return this.tenantService.create(createTenantDto);
  }

  // ✅ Create multiple Tenants
  @Post()
  createMany(@Body() createTenantDtos: CreateTenantDto[]): Promise<Tenant[]> {
    return this.tenantService.createMany(createTenantDtos);
  }

  // ✅ Find by ID
  @Get(':id')
  findOne(@Param('id') id: string): Promise<Tenant | null> {
    return this.tenantService.findOne(id);
  }

  // ✅ Find all
  @Get()
  findAll(): Promise<Tenant[]> {
    return this.tenantService.findAll();
  }

  // ✅ Protected example
  @Get('protected')
  @UseGuards(AuthGuard('jwt'))
  getProtected(@Req() req: AuthenticatedRequest) {
    return {
      message: 'You are authenticated!',
      user: req.user,
    };
  }

  // ✅ ✅ ✅ NEW — Check domain availability
  @Get('check-domain')
  async checkDomain(@Query('domain') domain: string) {
    const isAvailable = await this.tenantService.isDomainAvailable(domain);
    return { available: isAvailable };
  }
}
