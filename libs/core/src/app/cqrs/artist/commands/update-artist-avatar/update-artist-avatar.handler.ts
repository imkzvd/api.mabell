import { CommandHandler } from '@core/app/types';
import { UpdateArtistAvatarCommand } from '@core/app/cqrs/artist/commands/update-artist-avatar/update-artist-avatar.command';
import { ArtistUpdateService } from '@core/app/components/artist/services/artist-update.service';

export class UpdateArtistAvatarHandler implements CommandHandler<UpdateArtistAvatarCommand> {
  constructor(private readonly _service: ArtistUpdateService) {}

  async execute({ id, payload }: UpdateArtistAvatarCommand) {
    return await this._service.updateAvatar(id, payload);
  }
}
