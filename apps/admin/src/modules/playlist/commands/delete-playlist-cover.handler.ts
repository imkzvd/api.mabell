import { CommandHandler } from '@nestjs/cqrs';
import { DeletePlaylistCoverCommand } from '@core/app/cqrs/playlist/commands/delete-playlist-cover/delete-playlist-cover.command';
import { DeletePlaylistCoverHandler as CoreDeletePlaylistCoverHandler } from '@core/app/cqrs/playlist/commands/delete-playlist-cover/delete-playlist-cover.handler';
import { PlaylistUpdateService } from '@core/app/components/playlist/services/playlist-update.service';

@CommandHandler(DeletePlaylistCoverCommand)
export class DeletePlaylistCoverHandler extends CoreDeletePlaylistCoverHandler {
  constructor(service: PlaylistUpdateService) {
    super(service);
  }
}
