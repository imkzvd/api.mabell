import { Inject } from '@nestjs/common';
import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { PlaylistService } from '@core/app/components/playlist/playlist.service';
import { TrackService } from '@core/app/components/track/track.service';
import { AddTrackInPlaylistCommand } from '@core/app/cqrs/playlist/commands/add-track-in-playlist/add-track-in-playlist.command';
import { AddTrackInPlaylistHandler as CoreAddTrackInPlaylistHandler } from '@core/app/cqrs/playlist/commands/add-track-in-playlist/add-track-in-playlist.handler';

@CommandHandler(AddTrackInPlaylistCommand)
export class AddTrackInPlaylistHandler implements ICommandHandler<AddTrackInPlaylistCommand> {
  private readonly _coreHandler: CoreAddTrackInPlaylistHandler;

  constructor(
    @Inject(PlaylistService) readonly playlistService: PlaylistService,
    @Inject(TrackService) readonly trackService: TrackService,
  ) {
    this._coreHandler = new CoreAddTrackInPlaylistHandler(playlistService, trackService);
  }

  execute(command: AddTrackInPlaylistCommand) {
    return this._coreHandler.execute(command);
  }
}
