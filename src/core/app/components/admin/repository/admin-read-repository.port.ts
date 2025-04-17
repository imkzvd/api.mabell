import { ReadRepository } from '../../../common/base/read-repository/read-repository.interface';
import { AdminDTO } from '../dtos/admin.dto';
import { AdminFilter } from './admin.filter';

export const ADMIN_READ_REPOSITORY_DI_TOKEN = Symbol('ADMIN_READ_REPOSITORY_DI_TOKEN');

export type AdminReadRepository = ReadRepository<AdminDTO, AdminFilter>;
