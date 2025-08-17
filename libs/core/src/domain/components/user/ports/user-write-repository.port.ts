import { User } from '../user.entity';
import { UserId } from '../types';

export interface UserWriteRepository {
  save(entity: User): Promise<void>;

  deleteById(id: string): Promise<UserId | null>;

  findById(id: string): Promise<User | null>;

  existsById(id: string): Promise<UserId | null>;

  existsByEmail(email: string): Promise<UserId | null>;

  existsByUsername(email: string): Promise<UserId | null>;

  getNextIndex(): Promise<number>;
}
