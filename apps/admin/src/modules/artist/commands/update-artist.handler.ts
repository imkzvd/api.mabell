import { CommandHandler } from '@nestjs/cqrs';
import { UpdateArtistCommand } from '@core/app/cqrs/artist/commands/update-artist/update-artist.command';
import { UpdateArtistHandler as CoreUpdateArtistHandler } from '@core/app/cqrs/artist/commands/update-artist/update-artist.handler';
import { ArtistUpdateService } from '@core/app/components/artist/services/artist-update.service';

@CommandHandler(UpdateArtistCommand)
export class UpdateArtistHandler extends CoreUpdateArtistHandler {
  constructor(service: ArtistUpdateService) {
    super(service);
  }
}
