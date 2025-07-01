import { CommandHandler } from '@core/app/types';
import { ArtistService } from '@core/app/components/artist/artist.service';
import { UpdateArtistAvatarCommand } from '@core/app/cqrs/artist/commands/update-artist-avatar/update-artist-avatar.command';

export class UpdateArtistAvatarHandler implements CommandHandler<UpdateArtistAvatarCommand> {
  constructor(private readonly _artistService: ArtistService) {}

  async execute({ id, payload }: UpdateArtistAvatarCommand) {
    return await this._artistService.updateArtistAvatar(id, payload);
  }
}
