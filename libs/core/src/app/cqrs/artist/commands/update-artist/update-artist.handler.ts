import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { Inject } from '@nestjs/common';
import { UpdateArtistCommand } from './update-artist.command';
import { ArtistService } from '../../../../components/artist/artist.service';

@CommandHandler(UpdateArtistCommand)
export class UpdateArtistHandler implements ICommandHandler<UpdateArtistCommand> {
  constructor(@Inject(ArtistService) private readonly _artistService: ArtistService) {}

  async execute({ id, payload }: UpdateArtistCommand) {
    return await this._artistService.updateArtist(id, payload);
  }
}
