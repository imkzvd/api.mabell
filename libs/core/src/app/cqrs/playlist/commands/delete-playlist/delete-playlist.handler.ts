import { CommandHandler } from '../../../../types';
import { DeletePlaylistCommand } from './delete-playlist.command';
import { PlaylistDeleteService } from '../../../../components/playlist';

export class DeletePlaylistHandler implements CommandHandler<DeletePlaylistCommand> {
  constructor(private readonly _service: PlaylistDeleteService) {}

  async execute({ id }: DeletePlaylistCommand) {
    await this._service.deleteById(id);
  }
}
