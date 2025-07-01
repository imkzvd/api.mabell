import { Command } from '@core/app/types';

export class DeleteAdminRefreshTokenByIdCommand extends Command<void> {
  constructor(public readonly id: string) {
    super();
  }
}
