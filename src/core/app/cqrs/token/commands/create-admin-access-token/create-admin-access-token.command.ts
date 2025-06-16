import { Command } from '@nestjs/cqrs';

export class CreateAdminAccessTokenCommand extends Command<string> {
  constructor(public readonly adminId: string) {
    super();
  }
}
