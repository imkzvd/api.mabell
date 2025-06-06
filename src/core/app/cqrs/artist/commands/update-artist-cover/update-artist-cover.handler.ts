import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { Inject } from '@nestjs/common';
import { UpdateArtistCoverCommand } from './update-artist-cover.command';
import { ArtistService } from '../../../../components/artist/artist.service';

@CommandHandler(UpdateArtistCoverCommand)
export class UpdateArtistCoverHandler implements ICommandHandler<UpdateArtistCoverCommand> {
  constructor(@Inject(ArtistService) private readonly _artistService: ArtistService) {}

  async execute({ id, payload }: UpdateArtistCoverCommand) {
    return await this._artistService.updateArtistCover(id, payload);
  }
}
