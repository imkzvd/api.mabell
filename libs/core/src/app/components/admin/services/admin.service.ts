import { OffsetLimitPaginationDTO } from '../../../../shared/dtos';
import { AdminDTO, AdminsDTO } from '../../../dtos';
import { AdminReadRepository } from '../../../ports';

export class AdminService {
  constructor(private readonly _RR: AdminReadRepository) {}

  findById(adminId: string): Promise<AdminDTO | null> {
    return this._RR.findById(adminId);
  }

  find(
    options?: Partial<{
      pagination?: OffsetLimitPaginationDTO;
    }>,
  ): Promise<AdminsDTO> {
    return this._RR.find(options);
  }
}
