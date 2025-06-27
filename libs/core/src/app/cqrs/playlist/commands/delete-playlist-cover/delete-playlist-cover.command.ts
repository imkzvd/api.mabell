import { Command } from '@core/app/types';
import { PlaylistId } from '@core/domain/components/playlist/types';

export class DeletePlaylistCoverCommand extends Command<PlaylistId> {
  constructor(public readonly id: string) {
    super();
  }
}
