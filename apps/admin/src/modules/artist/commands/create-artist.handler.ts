import { CommandHandler } from '@nestjs/cqrs';
import { CreateArtistCommand } from '@core/app/cqrs/artist/commands/create-artist/create-artist.command';
import { CreateArtistHandler as CoreCreateArtistHandler } from '@core/app/cqrs/artist/commands/create-artist/create-artist.handler';
import { ArtistCreateService } from '@core/app/components/artist/services/artist-create.service';

@CommandHandler(CreateArtistCommand)
export class CreateArtistHandler extends CoreCreateArtistHandler {
  constructor(service: ArtistCreateService) {
    super(service);
  }
}
