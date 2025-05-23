import { Command } from '@nestjs/cqrs';
import { UpdateAdminPayload } from '../../types';

export class UpdateAdminCommand extends Command<void> {
  constructor(
    public readonly id: string,
    public readonly payload: UpdateAdminPayload,
  ) {
    super();
  }
}
