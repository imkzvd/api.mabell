import { AdminDTO } from './dtos/admin.dto';
import {
  OffsetLimitPaginationDTO,
  OffsetLimitPaginationResponseDTO,
} from '../../../../shared/dtos';

export interface AdminReadRepository {
  findById(id: string): Promise<AdminDTO | null>;

  findByUsername(username: string): Promise<AdminDTO | null>;

  find(
    options?: Partial<{ pagination: OffsetLimitPaginationDTO }>,
  ): Promise<OffsetLimitPaginationResponseDTO<AdminDTO>>;
}
