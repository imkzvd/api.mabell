import { Inject } from '@nestjs/common';
import { CommandHandler } from '@nestjs/cqrs';
import { ArtistService } from '@core/app/components/artist/artist.service';
import { UpdateArtistCommand } from '@core/app/cqrs/artist/commands/update-artist/update-artist.command';
import { UpdateArtistHandler as CoreUpdateArtistHandler } from '@core/app/cqrs/artist/commands/update-artist/update-artist.handler';

@CommandHandler(UpdateArtistCommand)
export class UpdateArtistHandler extends CoreUpdateArtistHandler {
  constructor(@Inject(ArtistService) service: ArtistService) {
    super(service);
  }
}
