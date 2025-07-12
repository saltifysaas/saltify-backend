import { join } from 'path';
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule, ConfigService } from '@nestjs/config';

import { TenantModule } from './tenant/tenant.module';
import { UserModule } from './user/user.module';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [
    // ✅ Load .env.<env> dynamically (e.g., .env.production)
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: join(__dirname, '..', `.env.${process.env.NODE_ENV || 'staging'}`),
    }),

    // ✅ TypeORM Supabase config
    TypeOrmModule.forRootAsync({
      inject: [ConfigService],
      useFactory: (config: ConfigService) => ({
        type: 'postgres',
        url: config.get<string>('DATABASE_URL'),
        ssl: {
          rejectUnauthorized: false,
        },
        extra: {
          ssl: {
            rejectUnauthorized: false,
          },
          connectionTimeoutMillis: 5000, // ✅ Helps prevent hanging
        },
        autoLoadEntities: true,
        synchronize: false, // ✅ NEVER true in production
        migrationsRun: true, // ✅ Auto-run migrations on startup
        migrations: [join(__dirname, 'migrations', '*{.ts,.js}')],
      }),
    }),

    TenantModule,
    UserModule,
    AuthModule,
  ],
})
export class AppModule {}
