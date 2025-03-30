import { WriteRepository } from '../../../common/repository/write-repository.interface';
import { Admin, AdminId } from '../admin.entity';
import { AdminFilter } from './admin.filter';

export const ADMIN_WRITE_REPOSITORY_DI_TOKEN = Symbol('ADMIN_WRITE_REPOSITORY_DI_TOKEN');

export type AdminWriteRepository = WriteRepository<Admin, AdminId, AdminFilter>;
