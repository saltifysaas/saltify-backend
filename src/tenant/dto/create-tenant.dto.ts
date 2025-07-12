// src/tenant/dto/create-tenant.dto.ts

import { IsNotEmpty } from 'class-validator';

export class CreateTenantDto {
  @IsNotEmpty()
  name!: string;

  @IsNotEmpty()
  domain!: string;

  // Add any other fields your tenant must have
}
