import { UserDTO } from './dtos/user.dto';

export interface UserReadRepository {
  findById(
    id: string,
    options?: Partial<{
      isPublic: boolean;
    }>,
  ): Promise<UserDTO | null>;

  findByUsername(username: string): Promise<UserDTO | null>;
}
