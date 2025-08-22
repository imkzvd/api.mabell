import { AdminDTO, AdminsDTO } from '../../dtos';
import { OffsetLimitPaginationDTO } from '../../../shared/dtos';

export interface AdminReadRepository {
  findById(adminId: string): Promise<AdminDTO | null>;

  findByUsername(username: string): Promise<AdminDTO | null>;

  find(options?: Partial<{ pagination: OffsetLimitPaginationDTO }>): Promise<AdminsDTO>;
}
