import { Command } from '../../../../types';

export class DeleteAlbumCoverCommand extends Command<void> {
  constructor(public readonly id: string) {
    super();
  }
}
