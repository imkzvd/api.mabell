import { Query } from '../../../../types';
import { OffsetLimitPaginationDTO } from '../../../../../shared/dtos';
import { AdminsDTO } from '../../../../dtos';

export class GetAdminsQuery extends Query<AdminsDTO> {
  constructor(public readonly options?: Partial<{ pagination?: OffsetLimitPaginationDTO }>) {
    super();
  }
}
