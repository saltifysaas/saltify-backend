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

  // ✅ Create a single tenant
  async create(data: Partial<Tenant>): Promise<Tenant> {
    const tenant = this.tenantRepository.create(data);
    return this.tenantRepository.save(tenant);
  }

  // ✅ Alias for single create
  async createTenant(data: Partial<Tenant>): Promise<Tenant> {
    return this.create(data);
  }

  // ✅ Create multiple tenants
  async createMany(dataArray: Partial<Tenant>[]): Promise<Tenant[]> {
    const tenants = this.tenantRepository.create(dataArray);
    return this.tenantRepository.save(tenants);
  }

  // ✅ Find by ID
  async findOne(id: string): Promise<Tenant | null> {
    return this.tenantRepository.findOne({ where: { id } });
  }

  // ✅ Find all
  async findAll(): Promise<Tenant[]> {
    return this.tenantRepository.find();
  }

  // ✅ Find by domain
  async findByDomain(domain: string): Promise<Tenant | null> {
    return this.tenantRepository.findOne({ where: { domain } });
  }

  // ✅ NEW: Check domain availability
  async isDomainAvailable(domain: string): Promise<boolean> {
    const exists = await this.tenantRepository.findOne({ where: { domain } });
    return !exists;
  }
}
