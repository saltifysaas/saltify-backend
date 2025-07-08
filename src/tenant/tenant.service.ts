import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Tenant } from './tenant.entity';

@Injectable()
export class TenantService {
  constructor(
    @InjectRepository(Tenant)
    private tenantRepo: Repository<Tenant>,
  ) {}

  create(tenantData: Partial<Tenant>) {
    const tenant = this.tenantRepo.create(tenantData);
    return this.tenantRepo.save(tenant);
  }

  findAll() {
    return this.tenantRepo.find();
  }

  findOne(id: string) {
    return this.tenantRepo.findOne({ where: { id } });
  }
}