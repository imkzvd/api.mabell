import { Inject } from '@nestjs/common';
import { CommandHandler } from '@nestjs/cqrs';
import { CreateArtistCommand } from '@core/app/cqrs/artist/commands/create-artist/create-artist.command';
import { CreateArtistHandler as CoreCreateArtistHandler } from '@core/app/cqrs/artist/commands/create-artist/create-artist.handler';
import { ArtistService } from '@core/app/components/artist/artist.service';

@CommandHandler(CreateArtistCommand)
export class CreateArtistHandler extends CoreCreateArtistHandler {
  constructor(@Inject(ArtistService) readonly service: ArtistService) {
    super(service);
  }
}
