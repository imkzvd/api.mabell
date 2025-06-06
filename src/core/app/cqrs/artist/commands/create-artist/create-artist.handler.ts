import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { Inject } from '@nestjs/common';
import { CreateArtistCommand } from './create-artist.command';
import { ArtistService } from '../../../../components/artist/artist.service';

@CommandHandler(CreateArtistCommand)
export class CreateArtistHandler implements ICommandHandler<CreateArtistCommand> {
  constructor(@Inject(ArtistService) private readonly _artistService: ArtistService) {}

  async execute() {
    return await this._artistService.createArtist();
  }
}
