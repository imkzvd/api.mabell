import { CommandHandler } from '@core/app/types';
import { DeleteArtistAvatarCommand } from '@core/app/cqrs/artist/commands/delete-artist-avatar/delete-artist-avatar.command';
import { ArtistUpdateService } from '@core/app/components/artist/services/artist-update.service';

export class DeleteArtistAvatarHandler implements CommandHandler<DeleteArtistAvatarCommand> {
  constructor(private readonly _service: ArtistUpdateService) {}

  async execute({ id }: DeleteArtistAvatarCommand) {
    return await this._service.deleteAvatar(id);
  }
}
