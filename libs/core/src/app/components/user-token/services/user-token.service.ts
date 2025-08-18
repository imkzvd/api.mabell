import { UserRefreshTokenReadRepository } from '../../../ports';
import { UserRefreshTokenDTO } from '../../../dtos';

export class UserTokenService {
  constructor(private readonly _RR: UserRefreshTokenReadRepository) {}

  async findRefreshTokensByUserId(userId: string): Promise<UserRefreshTokenDTO[]> {
    return this._RR.findByOwnerId(userId);
  }
}
