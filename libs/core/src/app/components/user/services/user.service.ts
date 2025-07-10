import { UserReadRepository } from '@core/domain/components/user/repository/user-read-repository.port';
import { UserDTO } from '../dtos/user.dto';
import UserMapper from '../dtos/user.mapper';

export class UserService {
  constructor(private readonly _RR: UserReadRepository) {}

  async find(id: string, options?: Partial<{ isPublic: boolean }>): Promise<UserDTO | null> {
    const foundUser = await this._RR.findById(id, {
      isPublic: options?.isPublic,
    });

    return foundUser ? UserMapper.toDTO(foundUser) : null;
  }
}
