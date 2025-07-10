import { UserId } from '@core/domain/components/user/types';
import { UserWriteRepository } from '@core/domain/components/user/repository/user-write-repository.port';

export class UserVerifyService {
  constructor(private readonly _WR: UserWriteRepository) {}

  verify(id: string): Promise<UserId | null> {
    return this._WR.existsById(id);
  }
}
