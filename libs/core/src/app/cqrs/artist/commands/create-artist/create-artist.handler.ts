import { CommandHandler } from '@core/app/types';
import { ArtistService } from '@core/app/components/artist/artist.service';
import { CreateArtistCommand } from '@core/app/cqrs/artist/commands/create-artist/create-artist.command';

export class CreateArtistHandler implements CommandHandler<CreateArtistCommand> {
  constructor(private readonly _artistService: ArtistService) {}

  async execute() {
    return await this._artistService.createArtist();
  }
}
