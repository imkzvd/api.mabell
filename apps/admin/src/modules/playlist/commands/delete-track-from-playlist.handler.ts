import { CommandHandler } from '@nestjs/cqrs';
import { DeleteTrackFromPlaylistCommand } from '@core/app/cqrs/playlist/commands/delete-track-from-playlist/delete-track-from-playlist.command';
import { DeleteTrackFromPlaylistHandler as CoreDeleteTrackFromPlaylistHandler } from '@core/app/cqrs/playlist/commands/delete-track-from-playlist/delete-track-from-playlist.handler';
import { TrackVerifyService } from '@core/app/components/track/services/track-verify.service';
import { PlaylistUpdateService } from '@core/app/components/playlist/services/playlist-update.service';

@CommandHandler(DeleteTrackFromPlaylistCommand)
export class DeleteTrackFromPlaylistHandler extends CoreDeleteTrackFromPlaylistHandler {
  constructor(
    trackVerifyService: TrackVerifyService,
    playlistUpdateService: PlaylistUpdateService,
  ) {
    super(trackVerifyService, playlistUpdateService);
  }
}
