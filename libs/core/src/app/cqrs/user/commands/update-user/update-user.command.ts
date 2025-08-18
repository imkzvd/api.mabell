import { Command } from '../../../../types';
import { UpdateUserPayload } from '../../../../components/user/types';

export class UpdateUserCommand extends Command<void> {
  constructor(
    public readonly id: string,
    public readonly payload: UpdateUserPayload,
  ) {
    super();
  }
}
