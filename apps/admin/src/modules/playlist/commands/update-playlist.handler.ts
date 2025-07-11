import { CommandHandler } from '@nestjs/cqrs';
import { UpdatePlaylistCommand } from '@core/app/cqrs/playlist/commands/update-playlist/update-playlist.command';
import { UpdatePlaylistHandler as CoreUpdatePlaylistHandler } from '@core/app/cqrs/playlist/commands/update-playlist/update-playlist.handler';
import { PlaylistUpdateService } from '@core/app/components/playlist/services/playlist-update.service';

@CommandHandler(UpdatePlaylistCommand)
export class UpdatePlaylistHandler extends CoreUpdatePlaylistHandler {
  constructor(service: PlaylistUpdateService) {
    super(service);
  }
}
