import { CommandHandler } from '../../../../types';
import { DeletePlaylistCoverCommand } from './delete-playlist-cover.command';
import { PlaylistUpdateService } from '../../../../components/playlist';

export class DeletePlaylistCoverHandler implements CommandHandler<DeletePlaylistCoverCommand> {
  constructor(private readonly _service: PlaylistUpdateService) {}

  async execute({ id }: DeletePlaylistCoverCommand) {
    await this._service.deleteCoverById(id);
  }
}
