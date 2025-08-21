import { CommandHandler } from '../../../../types';
import { CreateArtistCommand } from './create-artist.command';
import { ArtistCreateService } from '../../../../components/artist';

export class CreateArtistHandler implements CommandHandler<CreateArtistCommand> {
  constructor(private readonly _service: ArtistCreateService) {}

  async execute() {
    const id = await this._service.create();

    return { id };
  }
}
