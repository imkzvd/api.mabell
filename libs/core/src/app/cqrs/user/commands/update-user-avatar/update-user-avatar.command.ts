import { Command } from '@core/app/types';
import { UserId } from '@core/domain/components/user/types';
import { UpdateUserAvatarPayload } from '@core/app/components/user/types';

export class UpdateUserAvatarCommand extends Command<UserId> {
  constructor(
    public readonly id: string,
    public readonly payload: UpdateUserAvatarPayload,
  ) {
    super();
  }
}
