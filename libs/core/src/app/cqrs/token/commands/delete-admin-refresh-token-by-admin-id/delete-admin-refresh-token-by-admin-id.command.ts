import { Command } from '../../../../types';

export class DeleteAdminRefreshTokenByAdminIdCommand extends Command<void> {
  constructor(public readonly adminId: string) {
    super();
  }
}
