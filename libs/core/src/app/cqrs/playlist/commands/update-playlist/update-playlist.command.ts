import { Command } from '@core/app/types';
import { PlaylistId } from '@core/domain/components/playlist/types';
import { UpdatePlaylistPayload } from '@core/app/components/playlist/types';

export class UpdatePlaylistCommand extends Command<PlaylistId> {
  constructor(
    public readonly id: string,
    public readonly payload: UpdatePlaylistPayload,
  ) {
    super();
  }
}
