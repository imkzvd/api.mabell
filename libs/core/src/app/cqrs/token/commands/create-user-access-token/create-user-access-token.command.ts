import { Command } from '@core/app/types';

export class CreateUserAccessTokenCommand extends Command<string> {
  constructor(public readonly userId: string) {
    super();
  }
}
