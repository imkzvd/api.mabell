import { Command } from '@nestjs/cqrs';

export class UpdateUserPasswordCommand extends Command<void> {
  constructor(
    public readonly id: string,
    public readonly payload: {
      password: string;
      newPassword: string;
    },
  ) {
    super();
  }
}
