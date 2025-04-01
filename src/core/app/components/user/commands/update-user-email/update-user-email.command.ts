import { Command } from '@nestjs/cqrs';

export class UpdateUserEmailCommand extends Command<void> {
  constructor(
    public readonly id: string,
    public readonly email: string,
  ) {
    super();
  }
}
