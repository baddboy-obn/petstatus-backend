import { IAuth } from '../interfaces/IAuth';
import { IsNotEmpty, IsString } from 'class-validator';
import { Expose } from 'class-transformer';
import { ApiProperty } from '@nestjs/swagger';

export class SigninBodyDto implements Omit<IAuth, 'id'|'createAt'|'updateAt'| 'secretExpiredAt'> {
  @Expose()
  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  publicKey: string;

  @Expose()
  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  secretKey: string;
}
