import { Inject } from '@nestjs/common';
import { CommandHandler } from '@nestjs/cqrs';
import { PlaylistService } from '@core/app/components/playlist/playlist.service';
import { TrackService } from '@core/app/components/track/track.service';
import { AddTrackInPlaylistCommand } from '@core/app/cqrs/playlist/commands/add-track-in-playlist/add-track-in-playlist.command';
import { AddTrackInPlaylistHandler as CoreAddTrackInPlaylistHandler } from '@core/app/cqrs/playlist/commands/add-track-in-playlist/add-track-in-playlist.handler';

@CommandHandler(AddTrackInPlaylistCommand)
export class AddTrackInPlaylistHandler extends CoreAddTrackInPlaylistHandler {
  constructor(
    @Inject(PlaylistService) readonly playlistService: PlaylistService,
    @Inject(TrackService) readonly trackService: TrackService,
  ) {
    super(playlistService, trackService);
  }
}
