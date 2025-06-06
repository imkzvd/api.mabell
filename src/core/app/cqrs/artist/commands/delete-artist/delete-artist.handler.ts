import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { Inject } from '@nestjs/common';
import { DeleteArtistCommand } from './delete-artist.command';
import { ArtistService } from '../../../../components/artist/artist.service';

@CommandHandler(DeleteArtistCommand)
export class DeleteArtistHandler implements ICommandHandler<DeleteArtistCommand> {
  constructor(@Inject(ArtistService) private readonly _artistService: ArtistService) {}

  async execute({ id }: DeleteArtistCommand) {
    return await this._artistService.deleteArtist(id);
  }
}
