import { Command } from '@core/app/types';
import { AdminId } from '@core/domain/components/admin/types';

export class RefreshAdminPasswordCommand extends Command<{ id: AdminId; password: string }> {
  constructor(public readonly id: string) {
    super();
  }
}
