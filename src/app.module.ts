import * as dotenv from 'dotenv';
import { join } from 'path';

dotenv.config({
  path: join(__dirname, '..', `.env.${process.env.NODE_ENV || 'development'}`),
});

import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule, ConfigService } from '@nestjs/config';

import { TenantModule } from './tenant/tenant.module';
import { UserModule } from './user/user.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: join(__dirname, '..', `.env.${process.env.NODE_ENV || 'development'}`),
      ignoreEnvFile: process.env.NODE_ENV === 'production', // ✅ disables .env in prod
    }),

    TypeOrmModule.forRootAsync({
      inject: [ConfigService],
      useFactory: (config: ConfigService) => {
        console.log('✅ DATABASE_URL:', config.get<string>('DATABASE_URL'));
        return {
          type: 'postgres',
          url: config.get<string>('DATABASE_URL'),
          ssl: {
            rejectUnauthorized: false,
          },
          extra: {
            ssl: {
              rejectUnauthorized: false,
            },
          },
          autoLoadEntities: true,
          synchronize: process.env.NODE_ENV !== 'production',
        };
      },
    }),

    TenantModule,
    UserModule,
  ],
})
export class AppModule {}
