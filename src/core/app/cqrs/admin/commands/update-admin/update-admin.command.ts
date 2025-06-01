import { Command } from '@nestjs/cqrs';
import { AdminId } from '../../../../../domain/components/admin/types';
import { UpdateAdminPayload } from '../../../../components/admin/types';

export class UpdateAdminCommand extends Command<AdminId> {
  constructor(
    public readonly id: string,
    public readonly payload: UpdateAdminPayload,
  ) {
    super();
  }
}
