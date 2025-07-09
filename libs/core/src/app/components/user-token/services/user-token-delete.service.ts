import { NotFoundException } from '@core/shared/exceptions';
import { UserRefreshTokenId } from '@core/domain/components/user-refresh-token/types';
import { UserRefreshTokenWriteRepository } from '@core/domain/components/user-refresh-token/user-refresh-token-write-repository.port';

export class UserTokenDeleteService {
  constructor(private readonly _WR: UserRefreshTokenWriteRepository) {}

  async deleteRefreshToken(id: string): Promise<UserRefreshTokenId> {
    const deletedRefreshTokenId = await this._WR.deleteById(id);

    if (!deletedRefreshTokenId) {
      throw new NotFoundException('Token does not exist');
    }

    return deletedRefreshTokenId;
  }

  async deleteRefreshTokensByUserId(id: string): Promise<void> {
    await this._WR.deleteByOwnerId(id);
  }
}
