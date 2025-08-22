import { Command } from '../../../../types';

export class DeleteUserAvatarCommand extends Command<void> {
  constructor(public readonly id: string) {
    super();
  }
}
