import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { Inject } from '@nestjs/common';
import { DeleteArtistCoverCommand } from './delete-artist-cover.command';
import { ArtistService } from '../../../../components/artist/artist.service';

@CommandHandler(DeleteArtistCoverCommand)
export class DeleteArtistCoverHandler implements ICommandHandler<DeleteArtistCoverCommand> {
  constructor(@Inject(ArtistService) private readonly _artistService: ArtistService) {}

  async execute({ id }: DeleteArtistCoverCommand) {
    return await this._artistService.deleteArtistCover(id);
  }
}
