import { CommandHandler } from '../../../../types';
import { DeleteArtistAvatarCommand } from './delete-artist-avatar.command';
import { ArtistUpdateService } from '../../../../components/artist';

export class DeleteArtistAvatarHandler implements CommandHandler<DeleteArtistAvatarCommand> {
  constructor(private readonly _service: ArtistUpdateService) {}

  async execute({ id }: DeleteArtistAvatarCommand) {
    await this._service.deleteAvatarById(id);
  }
}
