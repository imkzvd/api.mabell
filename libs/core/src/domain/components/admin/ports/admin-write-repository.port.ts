import { Admin } from '../admin.entity';
import { AdminId } from '../types';

export interface AdminWriteRepository {
  save(entity: Admin): Promise<void>;

  deleteById(adminId: string): Promise<AdminId | null>;

  findById(adminId: string): Promise<Admin | null>;

  existsByUsername(username: string): Promise<AdminId | null>;

  getNextIndex(): Promise<number>;
}
