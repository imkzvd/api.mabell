import { Inject } from '@nestjs/common';
import { CommandHandler } from '@nestjs/cqrs';
import { ArtistService } from '@core/app/components/artist/artist.service';
import { DeleteArtistCoverCommand } from '@core/app/cqrs/artist/commands/delete-artist-cover/delete-artist-cover.command';
import { DeleteArtistCoverHandler as CoreDeleteArtistCoverHandler } from '@core/app/cqrs/artist/commands/delete-artist-cover/delete-artist-cover.handler';

@CommandHandler(DeleteArtistCoverCommand)
export class DeleteArtistCoverHandler extends CoreDeleteArtistCoverHandler {
  constructor(@Inject(ArtistService) service: ArtistService) {
    super(service);
  }
}
