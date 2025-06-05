import { Command } from '@nestjs/cqrs';
import { AdminId } from '../../../../../domain/components/admin/types';

export class UpdateAdminUsernameCommand extends Command<AdminId> {
  constructor(
    public readonly id: string,
    public readonly username: string,
  ) {
    super();
  }
}
