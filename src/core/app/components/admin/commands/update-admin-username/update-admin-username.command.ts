import { Command } from '@nestjs/cqrs';

export class UpdateAdminUsernameCommand extends Command<void> {
  constructor(
    public readonly id: string,
    public readonly username: string,
  ) {
    super();
  }
}
