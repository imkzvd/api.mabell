import { Command } from '../../../../types';

export class CreateUserRefreshTokenCommand extends Command<{ token: string }> {
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
