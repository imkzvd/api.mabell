import { CommandHandler } from '@nestjs/cqrs';
import { UpdateArtistCoverCommand } from '@core/app/cqrs/artist/commands/update-artist-cover/update-artist-cover.command';
import { UpdateArtistCoverHandler as CoreUpdateArtistCoverHandler } from '@core/app/cqrs/artist/commands/update-artist-cover/update-artist-cover.handler';
import { ArtistUpdateService } from '@core/app/components/artist/services/artist-update.service';

@CommandHandler(UpdateArtistCoverCommand)
export class UpdateArtistCoverHandler extends CoreUpdateArtistCoverHandler {
  constructor(service: ArtistUpdateService) {
    super(service);
  }
}
