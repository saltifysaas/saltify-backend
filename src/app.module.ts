import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';
import { TenantModule } from './tenant/tenant.module';
import { UserModule } from './user/user.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'db.qgazpcbrvhtqysgnspft.supabase.co',
      port: 5432,
      username: 'postgres',
      password: 'yuvrajchaubey',
      database: 'postgres',
      synchronize: true,
      autoLoadEntities: true,
      ssl: { rejectUnauthorized: false },
    }),
    TenantModule,
    UserModule,
  ],
})
export class AppModule {}
