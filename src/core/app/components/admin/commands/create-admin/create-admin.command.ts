import { Command } from '@nestjs/cqrs';

export class CreateAdminCommand extends Command<{ id: string; password: string }> {
  constructor() {
    super();
  }
}
