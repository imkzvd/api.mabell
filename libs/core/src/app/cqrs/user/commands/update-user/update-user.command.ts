import { Command } from '@core/app/types';
import { UserId } from '@core/domain/components/user/types';
import { UpdateUserPayload } from '@core/app/components/user/types';

export class UpdateUserCommand extends Command<UserId> {
  constructor(
    public readonly id: string,
    public readonly payload: UpdateUserPayload,
  ) {
    super();
  }
}
