import { Command } from '@core/app/types';
import { PlaylistId } from '@core/domain/components/playlist/types';
import { UpdatePlaylistCoverPayload } from '@core/app/components/playlist/types';

export class UpdatePlaylistCoverCommand extends Command<PlaylistId> {
  constructor(
    public readonly id: string,
    public readonly payload: UpdatePlaylistCoverPayload,
  ) {
    super();
  }
}
