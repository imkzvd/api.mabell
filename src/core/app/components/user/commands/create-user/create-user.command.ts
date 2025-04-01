import { Command } from '@nestjs/cqrs';

export class CreateUserCommand extends Command<{ id: string }> {
  constructor(
    public readonly username?: string,
    public readonly name?: string,
  ) {
    super();
  }
}
