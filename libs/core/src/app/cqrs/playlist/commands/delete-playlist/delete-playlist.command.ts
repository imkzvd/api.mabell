import { Command } from '@core/app/types';
import { PlaylistId } from '@core/domain/components/playlist/types';

export class DeletePlaylistCommand extends Command<PlaylistId> {
  constructor(public readonly id: string) {
    super();
  }
}
