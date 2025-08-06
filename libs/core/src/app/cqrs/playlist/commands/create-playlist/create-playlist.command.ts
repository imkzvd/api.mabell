import { Command } from '@core/app/types';
import { PlaylistId } from '@core/domain/components/playlist/types';

export class CreatePlaylistCommand extends Command<PlaylistId> {
  constructor(public readonly userId: string) {
    super();
  }
}
