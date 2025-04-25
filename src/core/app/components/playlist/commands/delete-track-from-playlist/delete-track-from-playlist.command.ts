import { Command } from '@nestjs/cqrs';

export class DeleteTrackFromPlaylistCommand extends Command<void> {
  constructor(
    public readonly playlistId: string,
    public readonly trackId: string,
  ) {
    super();
  }
}
