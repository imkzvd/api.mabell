import { CommandHandler } from '@nestjs/cqrs';
import { DeletePlaylistCommand } from '@core/app/cqrs/playlist/commands/delete-playlist/delete-playlist.command';
import { DeletePlaylistHandler as CoreDeletePlaylistHandler } from '@core/app/cqrs/playlist/commands/delete-playlist/delete-playlist.handler';
import { PlaylistDeleteService } from '@core/app/components/playlist/services/playlist-delete.service';

@CommandHandler(DeletePlaylistCommand)
export class DeletePlaylistHandler extends CoreDeletePlaylistHandler {
  constructor(service: PlaylistDeleteService) {
    super(service);
  }
}
