import { Admin } from '../admin.entity';
import { AdminId } from '../types';

export const ADMIN_WRITE_REPOSITORY_DI_TOKEN = Symbol('ADMIN_WRITE_REPOSITORY_DI_TOKEN');

export interface AdminWriteRepository {
  save(entity: Admin): Promise<void>;

  deleteById(id: string): Promise<AdminId | null>;

  findById(id: string): Promise<Admin | null>;

  existsByUsername(username: string): Promise<AdminId | null>;

  getNextIndex(): Promise<number>;
}
