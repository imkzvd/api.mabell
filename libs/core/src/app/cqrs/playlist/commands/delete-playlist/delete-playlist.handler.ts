import { CommandHandler } from '@core/app/types';
import { DeletePlaylistCommand } from '@core/app/cqrs/playlist/commands/delete-playlist/delete-playlist.command';
import { PlaylistDeleteService } from '@core/app/components/playlist/services/playlist-delete.service';

export class DeletePlaylistHandler implements CommandHandler<DeletePlaylistCommand> {
  constructor(private readonly _service: PlaylistDeleteService) {}

  async execute({ id }: DeletePlaylistCommand) {
    return await this._service.delete(id);
  }
}
