import { Command } from '../../../../types';
import { PlaylistId } from '../../../../../domain/components/playlist/types';

export class CreatePlaylistCommand extends Command<{ id: PlaylistId }> {
  constructor(public readonly userId: string) {
    super();
  }
}
