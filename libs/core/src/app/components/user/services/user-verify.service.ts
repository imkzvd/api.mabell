import { UserWriteRepository } from '../../../../domain/components/user';
import { UserId } from '../../../../domain/components/user/types';

export class UserVerifyService {
  constructor(private readonly _WR: UserWriteRepository) {}

  verifyById(userId: string): Promise<UserId | null> {
    return this._WR.existsById(userId);
  }
}
