import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Tenant } from './tenant.entity';

@Injectable()
export class TenantService {
  constructor(
    @InjectRepository(Tenant)
    private tenantRepository: Repository<Tenant>,
  ) {}

  async create(data: Partial<Tenant>): Promise<Tenant> {
    const tenant = this.tenantRepository.create(data);
    return this.tenantRepository.save(tenant);
  }

  // ✅ New: create multiple
  async createMany(dataArray: Partial<Tenant>[]): Promise<Tenant[]> {
    const tenants = this.tenantRepository.create(dataArray);
    return this.tenantRepository.save(tenants);
  }

  async findOne(id: string): Promise<Tenant | null> {
    return this.tenantRepository.findOne({ where: { id } });
  }

  async findAll(): Promise<Tenant[]> {
    return this.tenantRepository.find();
  }
}
