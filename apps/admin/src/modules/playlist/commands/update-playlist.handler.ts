import { Inject } from '@nestjs/common';
import { CommandHandler } from '@nestjs/cqrs';
import { PlaylistService } from '@core/app/components/playlist/playlist.service';
import { UpdatePlaylistCommand } from '@core/app/cqrs/playlist/commands/update-playlist/update-playlist.command';
import { UpdatePlaylistHandler as CoreUpdatePlaylistHandler } from '@core/app/cqrs/playlist/commands/update-playlist/update-playlist.handler';

@CommandHandler(UpdatePlaylistCommand)
export class UpdatePlaylistHandler extends CoreUpdatePlaylistHandler {
  constructor(@Inject(PlaylistService) readonly service: PlaylistService) {
    super(service);
  }
}
