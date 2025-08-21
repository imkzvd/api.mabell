import { Command } from '../../../../types';

export class DeleteAlbumCommand extends Command<void> {
  constructor(public readonly id: string) {
    super();
  }
}
