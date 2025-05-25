import { Command } from '@nestjs/cqrs';
import { UpdateUserPasswordPayload } from '../../types';

export class UpdateUserPasswordCommand extends Command<void> {
  constructor(
    public readonly id: string,
    public readonly payload: UpdateUserPasswordPayload,
  ) {
    super();
  }
}
