import { Command } from '@nestjs/cqrs';

export class CreateAdminCommand extends Command<{ id: string }> {
  constructor() {
    super();
  }
}
