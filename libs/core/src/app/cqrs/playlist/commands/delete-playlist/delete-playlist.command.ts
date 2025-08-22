import { Command } from '../../../../types';

export class DeletePlaylistCommand extends Command<void> {
  constructor(public readonly id: string) {
    super();
  }
}
