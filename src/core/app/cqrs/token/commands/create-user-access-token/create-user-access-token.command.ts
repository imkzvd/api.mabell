import { Command } from '@nestjs/cqrs';

export class CreateUserAccessTokenCommand extends Command<string> {
  constructor(public readonly userId: string) {
    super();
  }
}
