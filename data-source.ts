import 'reflect-metadata';
import * as dotenv from 'dotenv';
import { join } from 'path';
import { DataSource } from 'typeorm';
import { Tenant } from './src/tenant/tenant.entity';
import { User } from './src/user/user.entity';

// Load correct .env based on NODE_ENV
dotenv.config({
  path: join(__dirname, `.env.${process.env.NODE_ENV || 'staging'}`),
});

export const AppDataSource = new DataSource({
  type: 'postgres',
  url: process.env.DATABASE_URL,
  entities: [Tenant, User],
  migrations: [join(__dirname, 'src/migrations/*.{ts,js}')],
  synchronize: false,
  ssl: {
    rejectUnauthorized: false,
  },
  extra: {
    ssl: {
      rejectUnauthorized: false,
    },
  },
});
