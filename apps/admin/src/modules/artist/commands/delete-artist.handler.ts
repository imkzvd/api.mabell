import { CommandHandler } from '@nestjs/cqrs';
import { DeleteArtistCommand } from '@core/app/cqrs/artist/commands/delete-artist/delete-artist.command';
import { DeleteArtistHandler as CoreDeleteArtistHandler } from '@core/app/cqrs/artist/commands/delete-artist/delete-artist.handler';
import { ArtistDeleteService } from '@core/app/components/artist/services/artist-delete.service';

@CommandHandler(DeleteArtistCommand)
export class DeleteArtistHandler extends CoreDeleteArtistHandler {
  constructor(service: ArtistDeleteService) {
    super(service);
  }
}
