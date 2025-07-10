import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Tenant } from './tenant.entity';
import { CreateTenantDto } from './dto/create-tenant.dto';

@Injectable()
export class TenantService {
  constructor(
    @InjectRepository(Tenant)
    private readonly tenantRepository: Repository<Tenant>,
  ) {}

  async create(data: CreateTenantDto) {
    console.log('🚀 Creating tenant with data:', data);

    const tenant = this.tenantRepository.create(data);
    console.log('✅ Tenant entity created:', tenant);

    const saved = await this.tenantRepository.save(tenant);
    console.log('🎉 Tenant saved:', saved);

    return saved;
  }

  async findAll(): Promise<Tenant[]> {
    return this.tenantRepository.find();
  }

  async findOne(id: number): Promise<Tenant> {
    return this.tenantRepository.findOneBy({ id });
  }
}