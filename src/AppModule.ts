import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import * as path from 'path';

import {AuthModule} from "./auth/AuthModule";

import {AuthEntity} from "./auth/entities/AuthEntity";
import { AccountEntity } from './accounts/entities/AccountEntity';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: path.resolve(__dirname, '../', '.develop.env'),
    }),
    TypeOrmModule.forRootAsync({
      useFactory: () => ({
        type: 'postgres',
        host: process.env.POSTGRES_HOST,
        port: Number(process.env.POSTGRES_PORT),
        username: process.env.POSTGRES_USERNAME,
        password: process.env.POSTGRES_PASSWORD,
        database: process.env.POSTGRES_DBNAME,
        entities: [
          AuthEntity,
          AccountEntity,
        ],
        synchronize: Boolean(process.env.POSTGRES_SYNC),
      }),
    }),
    AuthModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
