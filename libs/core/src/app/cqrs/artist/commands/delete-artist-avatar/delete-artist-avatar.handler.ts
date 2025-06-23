import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { Inject } from '@nestjs/common';
import { DeleteArtistAvatarCommand } from './delete-artist-avatar.command';
import { ArtistService } from '../../../../components/artist/artist.service';

@CommandHandler(DeleteArtistAvatarCommand)
export class DeleteArtistAvatarHandler implements ICommandHandler<DeleteArtistAvatarCommand> {
  constructor(@Inject(ArtistService) private readonly _artistService: ArtistService) {}

  async execute({ id }: DeleteArtistAvatarCommand) {
    return await this._artistService.deleteArtistAvatar(id);
  }
}
