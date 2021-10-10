import {
  BadRequestException,
  Inject,
  Injectable,
  UnauthorizedException
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { JwtService } from '@nestjs/jwt';
import { Repository } from 'typeorm';
import { compare, hash } from 'bcrypt';

import { AuthEntity } from './entities/AuthEntity';

import { SigninBodyDto } from './dto/SigninBodyDto';
import { TokenResponseDto } from './dto/TokenResponseDto';
import { SignupBodyDto } from './dto/SignupBodyDto';
import { ValidateBodyDto } from './dto/ValidateBodyDto';
import { AccountEntity } from '../accounts/entities/AccountEntity';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(AuthEntity)
    private authEntityRepository: Repository<AuthEntity>,
    @InjectRepository(AccountEntity)
    private accountEntityRepository: Repository<AccountEntity>,
  ) {}

  @Inject()
  private readonly jwtService: JwtService;

  async signIn(data: SigninBodyDto): Promise<TokenResponseDto> {
    const found = await this.authEntityRepository.findOne({
      publicKey: data.publicKey
    })

    if(found) {
      throw new BadRequestException('Пользователь с таким логином уже зарегистрирован в системе');
    }

    const account = await this.accountEntityRepository.save({
      email: data.publicKey,
    })

    data['account'] = account;
    data['secretKey'] = await hash(data.secretKey, 10)

    await this.authEntityRepository.save(data);

    return await this.generateToken(data);
  }

  async signUp(data: SignupBodyDto): Promise<TokenResponseDto> {


    const found = await this.authEntityRepository.findOne({
      publicKey: data.publicKey,
    }, {
      relations: ['account']
    })

    if(!found) {
      throw new UnauthorizedException('Пользователь не найден');
    }

    const compareHash = await compare(data.secretKey, found.secretKey)

    if(!compareHash) {
      throw new BadRequestException('Не правильный пароль или логин у пользователя')
    }

    return await this.generateToken(found);
  }

  async validate(data: ValidateBodyDto): Promise<boolean> {
    return await this.validateToken(data)
  }

  async refresh (data: ValidateBodyDto): Promise<TokenResponseDto> {
    const valid = await this.validateToken(data.token);

    if(valid) {
      return await this.generateToken(data);
    }
  }

  private async validateToken(data): Promise<boolean> {
    try {
      await this.jwtService.verifyAsync(data.token);

      return true;
    }catch (e) {
      return false;
    }
  }

  private async generateToken(data): Promise<TokenResponseDto> {
    const accessToken = await this.jwtService.sign(
      { email: data.publicKey, role: data.account.role, accountId: data.account.id },
      { expiresIn: '1h' }
    )

    const refreshToken = await this.jwtService.sign(
      { email: data.publicKey, role: data.account.role, accountId: data.account.id },
      { expiresIn: '12h' }
    )

    return {
      accessToken,
      refreshToken,
    }
  }
}
