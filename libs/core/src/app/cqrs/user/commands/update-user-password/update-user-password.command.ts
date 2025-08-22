import { Command } from '../../../../types';
import { UpdateUserPasswordPayload } from '../../../../components/user/types';

export class UpdateUserPasswordCommand extends Command<void> {
  constructor(
    public readonly id: string,
    public readonly payload: UpdateUserPasswordPayload,
  ) {
    super();
  }
}
