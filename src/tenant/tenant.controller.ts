import { Controller, Post, Get, Param, Body } from '@nestjs/common';
import { TenantService } from './tenant.service';
import { Tenant } from './tenant.entity';

@Controller('tenants')
export class TenantController {
  constructor(private readonly tenantService: TenantService) {}

  @Post()
  create(@Body() data: Partial<Tenant>) {
    return this.tenantService.create(data);
  }

  @Get()
  findAll() {
    return this.tenantService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.tenantService.findOne(id);
  }
}
