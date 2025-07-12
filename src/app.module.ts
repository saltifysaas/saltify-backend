import * as dotenv from 'dotenv';
import { join } from 'path';

// ✅ Load .env.<NODE_ENV> with fallback to staging
dotenv.config({
  path: join(__dirname, '..', `.env.${process.env.NODE_ENV || 'staging'}`),
});

console.log('✅ NODE_ENV:', process.env.NODE_ENV);
console.log('✅ ENV PATH:', join(__dirname, '..', `.env.${process.env.NODE_ENV || 'staging'}`));

import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule, ConfigService } from '@nestjs/config';

import { TenantModule } from './tenant/tenant.module';
import { UserModule } from './user/user.module';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: join(__dirname, '..', `.env.${process.env.NODE_ENV || 'staging'}`),
      ignoreEnvFile: process.env.NODE_ENV === 'staging',
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
          synchronize: process.env.NODE_ENV !== 'staging',
        };
      },
    }),

    TenantModule,
    UserModule,
    AuthModule,
  ],
})
export class AppModule {}
