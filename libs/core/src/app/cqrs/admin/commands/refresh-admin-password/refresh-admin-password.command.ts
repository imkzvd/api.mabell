import { Command } from '../../../../types';

export class RefreshAdminPasswordCommand extends Command<{ password: string }> {
  constructor(public readonly id: string) {
    super();
  }
}
