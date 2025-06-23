import { Command } from '@nestjs/cqrs';

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
