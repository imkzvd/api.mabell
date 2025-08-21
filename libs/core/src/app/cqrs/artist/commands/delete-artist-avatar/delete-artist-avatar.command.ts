import { Command } from '../../../../types';

export class DeleteArtistAvatarCommand extends Command<void> {
  constructor(public readonly id: string) {
    super();
  }
}
