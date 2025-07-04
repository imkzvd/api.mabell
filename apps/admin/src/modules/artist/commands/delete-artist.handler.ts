import { Inject } from '@nestjs/common';
import { CommandHandler } from '@nestjs/cqrs';
import { DeleteArtistCommand } from '@core/app/cqrs/artist/commands/delete-artist/delete-artist.command';
import { DeleteArtistHandler as CoreDeleteArtistHandler } from '@core/app/cqrs/artist/commands/delete-artist/delete-artist.handler';
import { ArtistService } from '@core/app/components/artist/artist.service';

@CommandHandler(DeleteArtistCommand)
export class DeleteArtistHandler extends CoreDeleteArtistHandler {
  constructor(@Inject(ArtistService) service: ArtistService) {
    super(service);
  }
}
