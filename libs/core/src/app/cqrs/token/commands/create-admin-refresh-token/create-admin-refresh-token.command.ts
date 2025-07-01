import { Command } from '@core/app/types';

export class CreateAdminRefreshTokenCommand extends Command<string> {
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
