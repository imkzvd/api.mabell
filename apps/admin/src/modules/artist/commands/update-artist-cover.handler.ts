import { Inject } from '@nestjs/common';
import { CommandHandler } from '@nestjs/cqrs';
import { ArtistService } from '@core/app/components/artist/artist.service';
import { UpdateArtistCoverCommand } from '@core/app/cqrs/artist/commands/update-artist-cover/update-artist-cover.command';
import { UpdateArtistCoverHandler as CoreUpdateArtistCoverHandler } from '@core/app/cqrs/artist/commands/update-artist-cover/update-artist-cover.handler';

@CommandHandler(UpdateArtistCoverCommand)
export class UpdateArtistCoverHandler extends CoreUpdateArtistCoverHandler {
  constructor(@Inject(ArtistService) service: ArtistService) {
    super(service);
  }
}
