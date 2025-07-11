import { CommandHandler } from '@core/app/types';
import { DeletePlaylistCoverCommand } from '@core/app/cqrs/playlist/commands/delete-playlist-cover/delete-playlist-cover.command';
import { PlaylistUpdateService } from '@core/app/components/playlist/services/playlist-update.service';

export class DeletePlaylistCoverHandler implements CommandHandler<DeletePlaylistCoverCommand> {
  constructor(private readonly _service: PlaylistUpdateService) {}

  async execute({ id }: DeletePlaylistCoverCommand) {
    return await this._service.deleteCover(id);
  }
}
