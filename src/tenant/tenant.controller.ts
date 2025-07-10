import { Controller, Get, Post, Body, Param } from '@nestjs/common';
import { TenantService } from './tenant.service';
import { Tenant } from './tenant.entity';

@Controller('tenants')
export class TenantController {
  constructor(private readonly tenantService: TenantService) {}

  // Create one tenant (optional — keeps your single-POST working)
  @Post('single')
  createOne(@Body() createTenantDto: Partial<Tenant>): Promise<Tenant> {
    return this.tenantService.create(createTenantDto);
  }

  // ✅ Create multiple tenants
  @Post()
  createMany(@Body() createTenantDtos: Partial<Tenant>[]): Promise<Tenant[]> {
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
}