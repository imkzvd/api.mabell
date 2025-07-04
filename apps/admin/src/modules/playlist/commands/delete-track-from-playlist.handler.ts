import { Inject } from '@nestjs/common';
import { CommandHandler } from '@nestjs/cqrs';
import { PlaylistService } from '@core/app/components/playlist/playlist.service';
import { TrackService } from '@core/app/components/track/track.service';
import { DeleteTrackFromPlaylistCommand } from '@core/app/cqrs/playlist/commands/delete-track-from-playlist/delete-track-from-playlist.command';
import { DeleteTrackFromPlaylistHandler as CoreDeleteTrackFromPlaylistHandler } from '@core/app/cqrs/playlist/commands/delete-track-from-playlist/delete-track-from-playlist.handler';

@CommandHandler(DeleteTrackFromPlaylistCommand)
export class DeleteTrackFromPlaylistHandler extends CoreDeleteTrackFromPlaylistHandler {
  constructor(
    @Inject(PlaylistService) readonly playlistService: PlaylistService,
    @Inject(TrackService) readonly trackService: TrackService,
  ) {
    super(playlistService, trackService);
  }
}
