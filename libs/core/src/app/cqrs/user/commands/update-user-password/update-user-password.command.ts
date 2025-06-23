import { Command } from '@nestjs/cqrs';
import { UserId } from '../../../../../domain/components/user/types';
import { UpdateUserPasswordPayload } from '../../../../components/user/types';

export class UpdateUserPasswordCommand extends Command<UserId> {
  constructor(
    public readonly id: string,
    public readonly payload: UpdateUserPasswordPayload,
  ) {
    super();
  }
}
