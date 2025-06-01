import { Command } from '@nestjs/cqrs';
import { AdminId } from '../../../../../domain/components/admin/types';

export class RefreshAdminPasswordCommand extends Command<{ id: AdminId; password: string }> {
  constructor(public readonly id: string) {
    super();
  }
}
