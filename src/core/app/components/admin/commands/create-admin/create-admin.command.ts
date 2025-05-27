import { Command } from '@nestjs/cqrs';
import { AdminId } from '../../../../../domain/components/admin/types';

export class CreateAdminCommand extends Command<AdminId> {
  constructor() {
    super();
  }
}
