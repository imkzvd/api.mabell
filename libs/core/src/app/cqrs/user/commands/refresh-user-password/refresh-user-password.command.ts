import { Command } from '@core/app/types';
import { UserId } from '@core/domain/components/user/types';

export class RefreshUserPasswordCommand extends Command<{ id: UserId; password: string }> {
  constructor(public readonly id: string) {
    super();
  }
}
