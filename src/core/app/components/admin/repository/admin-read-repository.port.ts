import { AdminFilter } from './admin.filter';
import { ReadRepository } from '../../../common/base/read-repository/read-repository.interface';
import { AdminDTO } from '../dtos/admin.dto';
import { SimplifiedAdminDTO } from '../dtos/simplified-admin.dto';

export const ADMIN_READ_REPOSITORY_DI_TOKEN = Symbol('ADMIN_READ_REPOSITORY_DI_TOKEN');

export type AdminReadRepository = ReadRepository<AdminDTO, SimplifiedAdminDTO, AdminFilter>;
