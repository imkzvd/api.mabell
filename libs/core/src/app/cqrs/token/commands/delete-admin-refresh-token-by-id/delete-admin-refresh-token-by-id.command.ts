import { Command } from '../../../../types';

export class DeleteAdminRefreshTokenByIdCommand extends Command<void> {
  constructor(public readonly id: string) {
    super();
  }
}
