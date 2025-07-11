import { CommandHandler } from '@nestjs/cqrs';
import { UpdatePlaylistCoverCommand } from '@core/app/cqrs/playlist/commands/update-playlist-cover/update-playlist-cover.command';
import { UpdatePlaylistCoverHandler as CoreUpdatePlaylistCoverHandler } from '@core/app/cqrs/playlist/commands/update-playlist-cover/update-playlist-cover.handler';
import { PlaylistUpdateService } from '@core/app/components/playlist/services/playlist-update.service';

@CommandHandler(UpdatePlaylistCoverCommand)
export class UpdatePlaylistCoverHandler extends CoreUpdatePlaylistCoverHandler {
  constructor(service: PlaylistUpdateService) {
    super(service);
  }
}
