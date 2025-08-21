import { Command } from '../../../../types';

export class DeleteAdminRefreshTokenCommand extends Command<void> {
  constructor(public readonly token: string) {
    super();
  }
}
