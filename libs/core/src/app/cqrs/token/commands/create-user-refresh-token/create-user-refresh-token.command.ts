import { Command } from '@core/app/types';

export class CreateUserRefreshTokenCommand extends Command<string> {
  constructor(
    public readonly payload: {
      userId: string;
      ip: string;
      userAgent: string;
    },
  ) {
    super();
  }
}
