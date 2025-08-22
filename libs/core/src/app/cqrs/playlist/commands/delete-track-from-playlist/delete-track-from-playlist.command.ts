import { Command } from '../../../../types';

export class DeleteTrackFromPlaylistCommand extends Command<void> {
  constructor(
    public readonly playlistId: string,
    public readonly trackId: string,
  ) {
    super();
  }
}
