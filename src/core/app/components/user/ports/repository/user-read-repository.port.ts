import { UserDTO } from './dtos/user.dto';

export const USER_READ_REPOSITORY_DI_TOKEN = Symbol('USER_READ_REPOSITORY_DI_TOKEN');

export interface UserReadRepository {
  findById(
    id: string,
    options?: Partial<{
      isPublic: boolean;
    }>,
  ): Promise<UserDTO | null>;
}
