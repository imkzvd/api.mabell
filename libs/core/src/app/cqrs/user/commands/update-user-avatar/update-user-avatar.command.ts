import { Command } from '../../../../types';
import { UpdateUserAvatarPayload } from '../../../../components/user/types';

export class UpdateUserAvatarCommand extends Command<void> {
  constructor(
    public readonly id: string,
    public readonly payload: UpdateUserAvatarPayload,
  ) {
    super();
  }
}
