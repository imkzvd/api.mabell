import { CommandHandler } from '@core/app/types';
import { ArtistService } from '@core/app/components/artist/artist.service';
import { DeleteArtistAvatarCommand } from '@core/app/cqrs/artist/commands/delete-artist-avatar/delete-artist-avatar.command';

export class DeleteArtistAvatarHandler implements CommandHandler<DeleteArtistAvatarCommand> {
  constructor(private readonly _artistService: ArtistService) {}

  async execute({ id }: DeleteArtistAvatarCommand) {
    return await this._artistService.deleteArtistAvatar(id);
  }
}
