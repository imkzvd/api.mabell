import { Command } from '@nestjs/cqrs';
import { UpdateUserPayload } from '../../types';
import { UserId } from '../../../../../domain/components/user/types';

export class UpdateUserCommand extends Command<UserId> {
  constructor(
    public readonly id: string,
    public readonly payload: UpdateUserPayload,
  ) {
    super();
  }
}
