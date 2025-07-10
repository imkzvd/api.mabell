import { CommandHandler } from '@nestjs/cqrs';
import { AddTrackInPlaylistCommand } from '@core/app/cqrs/playlist/commands/add-track-in-playlist/add-track-in-playlist.command';
import { AddTrackInPlaylistHandler as CoreAddTrackInPlaylistHandler } from '@core/app/cqrs/playlist/commands/add-track-in-playlist/add-track-in-playlist.handler';
import { TrackVerifyService } from '@core/app/components/track/services/track-verify.service';
import { PlaylistUpdateService } from '@core/app/components/playlist/services/playlist-update.service';

@CommandHandler(AddTrackInPlaylistCommand)
export class AddTrackInPlaylistHandler extends CoreAddTrackInPlaylistHandler {
  constructor(
    trackVerifyService: TrackVerifyService,
    playlistUpdateService: PlaylistUpdateService,
  ) {
    super(trackVerifyService, playlistUpdateService);
  }
}
