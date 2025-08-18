import { Command } from '../../../../types';

export class CreateAdminAccessTokenCommand extends Command<{
  token: string;
}> {
  constructor(public readonly adminId: string) {
    super();
  }
}
