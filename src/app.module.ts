import * as dotenv from 'dotenv';
dotenv.config({ path: `.env.${process.env.NODE_ENV || 'development'}` });

import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule, ConfigService } from '@nestjs/config';

import { TenantModule } from './tenant/tenant.module';
import { UserModule } from './user/user.module';

@Module({
  imports: [
    // Load env variables from appropriate file and make them global
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: `.env.${process.env.NODE_ENV || 'development'}`,
    }),

    // TypeORM config using ConfigService
    TypeOrmModule.forRootAsync({
      inject: [ConfigService],
      useFactory: (config: ConfigService) => ({
        type: 'postgres',
        url: config.get<string>('DATABASE_URL'),  // ✅ use config.get() instead of process.env
        ssl: true,
        extra: {
          ssl: {
            rejectUnauthorized: false, // ✅ needed for Supabase
          },
        },
        autoLoadEntities: true,
        synchronize: true,
      }),
    }),

    // Business modules
    TenantModule,
    UserModule,
  ],
})
export class AppModule {}