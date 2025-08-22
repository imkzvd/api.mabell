import { User } from '../user.entity';
import { UserId } from '../types';

export interface UserWriteRepository {
  save(entity: User): Promise<void>;

  deleteById(userId: string): Promise<UserId | null>;

  findById(userId: string): Promise<User | null>;

  existsById(userId: string): Promise<UserId | null>;

  existsByEmail(email: string): Promise<UserId | null>;

  existsByUsername(email: string): Promise<UserId | null>;

  getNextIndex(): Promise<number>;
}
