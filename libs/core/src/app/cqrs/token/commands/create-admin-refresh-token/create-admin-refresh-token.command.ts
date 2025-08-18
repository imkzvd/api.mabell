import { Command } from '../../../../types';

export class CreateAdminRefreshTokenCommand extends Command<{ token: string }> {
  constructor(
    public readonly payload: {
      adminId: string;
      ip: string;
      userAgent: string;
    },
  ) {
    super();
  }
}
