/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),

    TypeOrmModule.forRoot({
      type: 'postgres',
      host: process.env.DB_HOST,
      port: Number(process.env.DB_PORT),
      username: process.env.DB_USERNAME,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_DATABASE,

      autoLoadEntities: true,

      synchronize: false, //  không tự động đồng bộ schema, dùng migration để quản lý thay đổi schema

      migrations: ['dist/database/migrations/*.js'],
      migrationsRun: false, //  không auto chạy migration khi start app

      ssl: {
        rejectUnauthorized: false,
      },
      logging: true,
    }),
  ],
})
export class DatabaseModule {}
