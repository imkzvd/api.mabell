import { Command } from '@core/app/types';
import { UserId } from '@core/domain/components/user/types';
import { UpdateUserPasswordPayload } from '@core/app/components/user/types';

export class UpdateUserPasswordCommand extends Command<UserId> {
  constructor(
    public readonly id: string,
    public readonly payload: UpdateUserPasswordPayload,
  ) {
    super();
  }
}
