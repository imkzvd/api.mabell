import { Inject } from '@nestjs/common';
import { CommandHandler } from '@nestjs/cqrs';
import { ArtistService } from '@core/app/components/artist/artist.service';
import { UpdateArtistAvatarCommand } from '@core/app/cqrs/artist/commands/update-artist-avatar/update-artist-avatar.command';
import { UpdateArtistAvatarHandler as CoreUpdateArtistAvatarHandler } from '@core/app/cqrs/artist/commands/update-artist-avatar/update-artist-avatar.handler';

@CommandHandler(UpdateArtistAvatarCommand)
export class UpdateArtistAvatarHandler extends CoreUpdateArtistAvatarHandler {
  constructor(@Inject(ArtistService) service: ArtistService) {
    super(service);
  }
}
