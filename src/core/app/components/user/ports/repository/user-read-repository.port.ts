import { UserFilter } from './user.filter';
import { ReadRepository } from '../../../../common/base/read-repository/read-repository.interface';
import { UserDTO } from '../../dtos/user.dto';
import { SimplifiedUserDTO } from '../../dtos/simplified-user.dto';

export const USER_READ_REPOSITORY_DI_TOKEN = Symbol('USER_READ_REPOSITORY_DI_TOKEN');

export type UserReadRepository = ReadRepository<UserDTO, SimplifiedUserDTO, UserFilter>;
