import { CommandHandler } from '../../../../types';
import { UpdateArtistAvatarCommand } from './update-artist-avatar.command';
import { ArtistUpdateService } from '../../../../components/artist';

export class UpdateArtistAvatarHandler implements CommandHandler<UpdateArtistAvatarCommand> {
  constructor(private readonly _service: ArtistUpdateService) {}

  async execute({ id, payload }: UpdateArtistAvatarCommand) {
    await this._service.updateAvatarById(id, payload);
  }
}
