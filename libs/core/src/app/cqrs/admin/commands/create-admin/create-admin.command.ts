import { Command } from '../../../../types';
import { AdminId } from '../../../../../domain/components/admin/types';

export class CreateAdminCommand extends Command<{ id: AdminId }> {
  constructor() {
    super();
  }
}
