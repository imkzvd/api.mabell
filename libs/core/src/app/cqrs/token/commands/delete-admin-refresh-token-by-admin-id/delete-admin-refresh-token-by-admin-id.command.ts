import { Command } from '@core/app/types';

export class DeleteAdminRefreshTokenByAdminIdCommand extends Command<void> {
  constructor(public readonly adminId: string) {
    super();
  }
}
