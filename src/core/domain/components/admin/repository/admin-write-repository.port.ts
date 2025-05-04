import { Admin } from '../admin.entity';

export const ADMIN_WRITE_REPOSITORY_DI_TOKEN = Symbol('ADMIN_WRITE_REPOSITORY_DI_TOKEN');

export interface AdminWriteRepository {
  save(entity: Admin): Promise<void>;
  deleteById(id: string): Promise<boolean>;
  findById(id: string): Promise<Admin | null>;
  existsByUsername(username: string): Promise<boolean>;
  getNextIndex(): Promise<number>;
}
