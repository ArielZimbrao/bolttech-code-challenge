import { Inject, Injectable } from '@nestjs/common';
import { CredentialDTO } from 'src/dto/auth/credential.dto';
import { TokenResponseDTO } from 'src/dto/auth/token-response.dto';
import { UserEntity } from 'src/entities/user.entity';
import {
  AccessUnauthorizedError,
  UserNotFoundError,
} from 'src/exception/exception';
import { cryptoUtils } from 'src/util/crypto.utils';
import { ConfigService } from '@nestjs/config';
import { Repository } from 'typeorm';
import * as ms from 'ms';

@Injectable()
export class AuthService {
  constructor(
    @Inject('USER_REPOSITORY')
    private userRepository: Repository<UserEntity>,
    private readonly configService: ConfigService,
  ) {}

  async login(credentital: CredentialDTO) {
    const user: UserEntity = await this.userRepository.findOne({
      where: {
          email: credentital.email
      }
    });

    if (!user) {
      throw new UserNotFoundError();
    }

    const compareHash = await cryptoUtils.compare(
      credentital.password,
      user.password,
    );

    if (user && compareHash) {
      return this.generateTokens(user).finally(() => {
        user.last_sigin = new Date();
        this.userRepository.save(user)
      });
    } else {
      throw new AccessUnauthorizedError();
    }
  }

  private async generateTokens(user: UserEntity): Promise<TokenResponseDTO> {
    const loginResponseDTO = new TokenResponseDTO();

    loginResponseDTO.userId = user.id;

    loginResponseDTO.expiresIn = this.getExpiresTimeToken();

    loginResponseDTO.userEmail = user.email;

    loginResponseDTO.userName = user.name;

    loginResponseDTO.accessToken = this.generateAccessToken(user);

    return loginResponseDTO;
  }

  private getExpiresTimeToken() {
    return ms(this.configService.get('APP_TOKEN_EXPIRATION'));
  }

  private generateAccessToken(user: UserEntity): string {

    return cryptoUtils.getAccessToken(user.id, user.email, user.password, this.getExpiresTimeToken())
  }
}
