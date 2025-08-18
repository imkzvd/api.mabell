import { UserRefreshTokenWriteRepository } from '../../../../domain/components/user-refresh-token';
import { NotFoundException } from '../../../../shared/exceptions';
import { UserRefreshTokenId } from '../../../../domain/components/user-refresh-token/types';

export class UserTokenDeleteService {
  constructor(private readonly _WR: UserRefreshTokenWriteRepository) {}

  async deleteRefreshTokenById(tokenId: string): Promise<UserRefreshTokenId> {
    const deletedRefreshTokenId = await this._WR.deleteById(tokenId);

    if (!deletedRefreshTokenId) {
      throw new NotFoundException('Token does not exist');
    }

    return deletedRefreshTokenId;
  }

  async deleteRefreshTokensByUserId(userId: string): Promise<void> {
    await this._WR.deleteByOwnerId(userId);
  }
}
