import * as dotenv from 'dotenv';
import { join } from 'path';

// ✅ Load .env.<env> based on NODE_ENV, default to development for local
dotenv.config({
  path: join(__dirname, '..', `.env.${process.env.NODE_ENV || 'development'}`),
});

import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule, ConfigService } from '@nestjs/config';

// ✅ Import your business modules
import { TenantModule } from './tenant/tenant.module';
import { UserModule } from './user/user.module';

@Module({
  imports: [
    // ✅ Make env vars available globally
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: join(__dirname, '..', `.env.${process.env.NODE_ENV || 'development'}`),
    }),

    // ✅ TypeORM async config, uses DATABASE_URL from env
    TypeOrmModule.forRootAsync({
      inject: [ConfigService],
      useFactory: (config: ConfigService) => ({
        type: 'postgres',
        url: config.get<string>('DATABASE_URL'),
        ssl: {
          rejectUnauthorized: false, // ✅ Needed for Supabase SSL
        },
        extra: {
          ssl: {
            rejectUnauthorized: false,
          },
        },
        autoLoadEntities: true,
        synchronize: process.env.NODE_ENV !== 'production', // ✅ PRO TIP: disable auto sync in production!
      }),
    }),

    // ✅ Your feature modules
    TenantModule,
    UserModule,
  ],
})
export class AppModule {}