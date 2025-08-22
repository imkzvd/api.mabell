import { Command } from '../../../../types';

export class AddTrackInPlaylistCommand extends Command<void> {
  constructor(
    public readonly playlistId: string,
    public readonly trackId: string,
  ) {
    super();
  }
}
