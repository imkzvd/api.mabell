import { UserReadRepository } from '../../../ports';
import { UserDTO } from '../../../dtos';

export class UserService {
  constructor(private readonly _RR: UserReadRepository) {}

  findById(userId: string, options?: Partial<{ isPublic: boolean }>): Promise<UserDTO | null> {
    return this._RR.findById(userId, {
      isPublic: options?.isPublic,
    });
  }
}
