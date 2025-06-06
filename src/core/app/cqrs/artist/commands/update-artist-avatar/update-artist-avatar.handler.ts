import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { Inject } from '@nestjs/common';
import { UpdateArtistAvatarCommand } from './update-artist-avatar.command';
import { ArtistService } from '../../../../components/artist/artist.service';

@CommandHandler(UpdateArtistAvatarCommand)
export class UpdateArtistAvatarHandler implements ICommandHandler<UpdateArtistAvatarCommand> {
  constructor(@Inject(ArtistService) private readonly _artistService: ArtistService) {}

  async execute({ id, payload }: UpdateArtistAvatarCommand) {
    return await this._artistService.updateArtistAvatar(id, payload);
  }
}
