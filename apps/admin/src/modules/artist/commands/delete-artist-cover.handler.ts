import { CommandHandler } from '@nestjs/cqrs';
import { DeleteArtistCoverCommand } from '@core/app/cqrs/artist/commands/delete-artist-cover/delete-artist-cover.command';
import { DeleteArtistCoverHandler as CoreDeleteArtistCoverHandler } from '@core/app/cqrs/artist/commands/delete-artist-cover/delete-artist-cover.handler';
import { ArtistUpdateService } from '@core/app/components/artist/services/artist-update.service';

@CommandHandler(DeleteArtistCoverCommand)
export class DeleteArtistCoverHandler extends CoreDeleteArtistCoverHandler {
  constructor(service: ArtistUpdateService) {
    super(service);
  }
}
