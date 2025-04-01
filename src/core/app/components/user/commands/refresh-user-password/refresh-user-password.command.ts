import { Command } from '@nestjs/cqrs';

export class RefreshUserPasswordCommand extends Command<{ password: string }> {
  constructor(public readonly id: string) {
    super();
  }
}
