import { User, UserId } from '../user.entity';
import { UserFilter } from './user.filter';
import { WriteRepository } from '../../../common/repository/write-repository.interface';

export const USER_WRITE_REPOSITORY_DI_TOKEN = Symbol('USER_WRITE_REPOSITORY_DI_TOKEN');

export type UserWriteRepository = WriteRepository<User, UserId, UserFilter>;
