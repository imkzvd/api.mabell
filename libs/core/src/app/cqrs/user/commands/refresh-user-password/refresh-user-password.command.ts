import { Command } from '../../../../types';
import { UserId } from '../../../../../domain/components/user/types';

export class RefreshUserPasswordCommand extends Command<{ id: UserId; password: string }> {
  constructor(public readonly id: string) {
    super();
  }
}
