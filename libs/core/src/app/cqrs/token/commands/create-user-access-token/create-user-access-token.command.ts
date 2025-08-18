import { Command } from '../../../../types';

export class CreateUserAccessTokenCommand extends Command<{ token: string }> {
  constructor(public readonly userId: string) {
    super();
  }
}
