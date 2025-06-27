import { AdminId } from '@core/domain/components/admin/types';
import { Command } from '@core/app/types';

export class CreateAdminCommand extends Command<AdminId> {
  constructor() {
    super();
  }
}
