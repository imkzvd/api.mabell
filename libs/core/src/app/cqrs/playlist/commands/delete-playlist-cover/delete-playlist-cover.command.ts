import { Command } from '../../../../types';

export class DeletePlaylistCoverCommand extends Command<void> {
  constructor(public readonly id: string) {
    super();
  }
}
