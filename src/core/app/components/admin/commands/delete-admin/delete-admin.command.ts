import { Command } from '@nestjs/cqrs';
import { AdminId } from '../../../../../domain/components/admin/types';

export class DeleteAdminCommand extends Command<AdminId> {
  constructor(public readonly id: string) {
    super();
  }
}
