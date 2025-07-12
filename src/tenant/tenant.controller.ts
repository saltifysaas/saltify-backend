import { Controller, Get, Post, Body, Param, UseGuards, Req } from '@nestjs/common';
import { TenantService } from './tenant.service';
import { Tenant } from './tenant.entity';
import { AuthGuard } from '@nestjs/passport';
import { Request } from 'express';
import { CreateTenantDto } from './dto/create-tenant.dto'; // ✅ Import your DTO

interface AuthenticatedRequest extends Request {
  user: any; // Optional: refine with your JWT payload shape
}

@Controller('tenants')
export class TenantController {
  constructor(private readonly tenantService: TenantService) {}

  @Post('single')
  createOne(@Body() createTenantDto: CreateTenantDto): Promise<Tenant> {
    return this.tenantService.create(createTenantDto);
  }

  @Post()
  createMany(@Body() createTenantDtos: CreateTenantDto[]): Promise<Tenant[]> {
    return this.tenantService.createMany(createTenantDtos);
  }

  @Get(':id')
  findOne(@Param('id') id: string): Promise<Tenant | null> {
    return this.tenantService.findOne(id);
  }

  @Get()
  findAll(): Promise<Tenant[]> {
    return this.tenantService.findAll();
  }

  @Get('protected')
  @UseGuards(AuthGuard('jwt'))
  getProtected(@Req() req: AuthenticatedRequest) {
    return {
      message: 'You are authenticated!',
      user: req.user,
    };
  }
}