import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class ValidateBodyDto {
  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  token: string;
}
