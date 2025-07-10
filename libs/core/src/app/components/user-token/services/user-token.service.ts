import { UserRefreshTokenReadRepository } from '@core/domain/components/user-refresh-token/user-refresh-token-read-repository.port';
import UserRefreshTokenMapper from '../dtos/user-refresh-token.mapper';
import { UserRefreshTokenDTO } from '../dtos/user-refresh-token.dto';

export class UserTokenService {
  constructor(private readonly _RR: UserRefreshTokenReadRepository) {}

  async findRefreshTokensByUserId(id: string): Promise<UserRefreshTokenDTO[]> {
    const foundTokens = await this._RR.findByOwnerId(id);

    return foundTokens.map((i) => UserRefreshTokenMapper.toDTO(i));
  }
}
