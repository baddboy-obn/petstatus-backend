import { Body, Controller, Get, HttpStatus, Inject, Injectable, Post } from '@nestjs/common';
import { ApiBearerAuth, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { SigninBodyDto } from './dto/SigninBodyDto';
import { SignupBodyDto } from './dto/SignupBodyDto';
import { ValidateBodyDto } from './dto/ValidateBodyDto';
import { createDeflateRaw } from 'zlib';
import { TokenResponseDto } from './dto/TokenResponseDto';
import { AuthService } from './AuthService';

@ApiTags('Сервис авторизации')
@Controller('auth')
export class AuthController {
  @Inject()
  private readonly authService: AuthService;

  @Post('/signin')
  @ApiOperation({
    summary: 'Регистрация'
  })
  @ApiResponse({ status: HttpStatus.OK, type: TokenResponseDto })
  async signIn(@Body() body: SigninBodyDto): Promise<TokenResponseDto> {
    return await this.authService.signIn(body);
  }

  @Post('/signup')
  @ApiOperation({
    summary: 'Авторизация'
  })
  @ApiResponse({ status: HttpStatus.OK, type: TokenResponseDto })
  async signUp(@Body() body: SignupBodyDto): Promise<TokenResponseDto> {
    return await this.authService.signUp(body);
  }

  @ApiOperation({
    summary: 'Валидация'
  })
  @Post('/validate')
  async validateToken(@Body() body: ValidateBodyDto): Promise<boolean> {
    return await this.authService.validate(body);;
  }

  @ApiOperation({
    summary: 'Обновить токен'
  })
  @ApiResponse({ status: HttpStatus.OK, type: TokenResponseDto })
  @Post('/refresh')
  async refreshToken(@Body() body: ValidateBodyDto): Promise<TokenResponseDto> {
    return await this.authService.refresh(body)
  }

  @ApiBearerAuth()
  @ApiOperation({
    summary: 'Информация о текущем авторизованном пользователе'
  })
  @Get('/me')
  getMe() {
    return 123;
  }

  @ApiBearerAuth()
  @ApiOperation({
    summary: 'Выход из системы'
  })
  @Get('/logout')
  logoff(@Body() body) {
    return body;
  }
}
