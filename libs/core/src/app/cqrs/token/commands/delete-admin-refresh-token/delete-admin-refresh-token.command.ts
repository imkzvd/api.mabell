import { Command } from '@nestjs/cqrs';

export class DeleteAdminRefreshTokenCommand extends Command<void> {
  constructor(public readonly token: string) {
    super();
  }
}
