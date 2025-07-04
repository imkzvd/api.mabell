import { Inject } from '@nestjs/common';
import { CommandHandler } from '@nestjs/cqrs';
import { PlaylistService } from '@core/app/components/playlist/playlist.service';
import { UpdatePlaylistCoverCommand } from '@core/app/cqrs/playlist/commands/update-playlist-cover/update-playlist-cover.command';
import { UpdatePlaylistCoverHandler as CoreUpdatePlaylistCoverHandler } from '@core/app/cqrs/playlist/commands/update-playlist-cover/update-playlist-cover.handler';

@CommandHandler(UpdatePlaylistCoverCommand)
export class UpdatePlaylistCoverHandler extends CoreUpdatePlaylistCoverHandler {
  constructor(@Inject(PlaylistService) readonly service: PlaylistService) {
    super(service);
  }
}
