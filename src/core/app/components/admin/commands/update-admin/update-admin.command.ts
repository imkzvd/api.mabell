import { Command } from '@nestjs/cqrs';
import { UpdateAdminPayload } from '../../types';
import { AdminId } from '../../../../../domain/components/admin/types';

export class UpdateAdminCommand extends Command<AdminId> {
  constructor(
    public readonly id: string,
    public readonly payload: UpdateAdminPayload,
  ) {
    super();
  }
}
