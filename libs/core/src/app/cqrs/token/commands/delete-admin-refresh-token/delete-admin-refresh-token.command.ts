import { Command } from '@core/app/types';

export class DeleteAdminRefreshTokenCommand extends Command<void> {
  constructor(public readonly token: string) {
    super();
  }
}
