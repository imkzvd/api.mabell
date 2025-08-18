import { Command } from '../../../../types';

export class DeleteAdminCommand extends Command<void> {
  constructor(public readonly id: string) {
    super();
  }
}
