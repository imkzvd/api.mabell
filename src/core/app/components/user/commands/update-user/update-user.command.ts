import { Command } from '@nestjs/cqrs';
import { UpdateUserPayload } from '../../types';

export class UpdateUserCommand extends Command<void> {
  constructor(
    public readonly id: string,
    public readonly payload: UpdateUserPayload,
  ) {
    super();
  }
}
