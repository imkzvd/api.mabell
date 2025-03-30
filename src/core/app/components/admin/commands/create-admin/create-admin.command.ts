import { Command } from '@nestjs/cqrs';

export class CreateAdminCommand extends Command<{ id: string; password: string }> {
  constructor(
    public readonly username?: string,
    public readonly name?: string,
  ) {
    super();
  }
}
