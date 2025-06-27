import { Command } from '@core/app/types';

export class CreateAdminAccessTokenCommand extends Command<string> {
  constructor(public readonly adminId: string) {
    super();
  }
}
