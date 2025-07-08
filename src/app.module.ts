import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TenantModule } from './tenant/tenant.module';
import { UserModule } from './user/user.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: `.env.${process.env.NODE_ENV || 'development'}`,
    }),
    TypeOrmModule.forRootAsync({
      inject: [ConfigService],
      useFactory: (config: ConfigService) => ({
        type: 'postgres',
        url: process.env.DATABASE_URL,
        ssl: true,
        extra: {
          ssl: {
            rejectUnauthorized: false, // for Supabase self-signed cert
          },
        },
        autoLoadEntities: true,
        synchronize: true,
      }),
    }),
    TenantModule,
    UserModule,
  ],
})
export class AppModule {}
