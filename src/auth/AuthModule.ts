import { Module } from '@nestjs/common';
import { AuthService } from './AuthService';
import { AuthController } from './AuthController';
import { TypeOrmModule } from "@nestjs/typeorm";
import { AuthEntity } from "./entities/AuthEntity";
import { JwtModule } from '@nestjs/jwt';
import { AccountEntity } from '../accounts/entities/AccountEntity';
import { ConfigModule } from '@nestjs/config';
import path from 'path';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: path.resolve(__dirname, '../../', '.develop.env'),
    }),
    TypeOrmModule.forFeature([
      AuthEntity,
      AccountEntity,
    ]),
    JwtModule.register({
      secret: process.env.JWT_SECRET ,
      signOptions: {
        expiresIn: '24h'
      }
    })
  ],
  providers: [AuthService],
  controllers: [AuthController],
})
export class AuthModule {}
