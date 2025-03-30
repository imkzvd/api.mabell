import { Command } from '@nestjs/cqrs';

export class RefreshAdminPasswordCommand extends Command<{ password: string }> {
  constructor(public readonly id: string) {
    super();
  }
}
