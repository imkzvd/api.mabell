import { Command } from '@core/app/types';
import { AdminId } from '@core/domain/components/admin/types';
import { UpdateAdminPayload } from '@core/app/components/admin/types';

export class UpdateAdminCommand extends Command<AdminId> {
  constructor(
    public readonly id: string,
    public readonly payload: UpdateAdminPayload,
  ) {
    super();
  }
}
