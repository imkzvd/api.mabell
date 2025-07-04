import { Inject } from '@nestjs/common';
import { CommandHandler } from '@nestjs/cqrs';
import { ArtistService } from '@core/app/components/artist/artist.service';
import { DeleteArtistAvatarCommand } from '@core/app/cqrs/artist/commands/delete-artist-avatar/delete-artist-avatar.command';
import { DeleteArtistAvatarHandler as CoreDeleteArtistAvatarHandler } from '@core/app/cqrs/artist/commands/delete-artist-avatar/delete-artist-avatar.handler';

@CommandHandler(DeleteArtistAvatarCommand)
export class DeleteArtistAvatarHandler extends CoreDeleteArtistAvatarHandler {
  constructor(@Inject(ArtistService) service: ArtistService) {
    super(service);
  }
}
