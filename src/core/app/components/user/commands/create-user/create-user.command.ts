import { Command } from '@nestjs/cqrs';

export class CreateUserCommand extends Command<{ id: string }> {
  constructor() {
    super();
  }
}
