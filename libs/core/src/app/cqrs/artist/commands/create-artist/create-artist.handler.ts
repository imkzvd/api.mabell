import { CommandHandler } from '@core/app/types';
import { CreateArtistCommand } from '@core/app/cqrs/artist/commands/create-artist/create-artist.command';
import { ArtistCreateService } from '@core/app/components/artist/services/artist-create.service';

export class CreateArtistHandler implements CommandHandler<CreateArtistCommand> {
  constructor(private readonly _service: ArtistCreateService) {}

  async execute() {
    return await this._service.create();
  }
}
