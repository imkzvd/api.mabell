import { Command } from '@core/app/types';
import { AdminId } from '@core/domain/components/admin/types';

export class DeleteAdminCommand extends Command<AdminId> {
  constructor(public readonly id: string) {
    super();
  }
}
