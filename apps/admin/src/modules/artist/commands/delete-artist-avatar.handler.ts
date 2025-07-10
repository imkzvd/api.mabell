import { CommandHandler } from '@nestjs/cqrs';
import { DeleteArtistAvatarCommand } from '@core/app/cqrs/artist/commands/delete-artist-avatar/delete-artist-avatar.command';
import { DeleteArtistAvatarHandler as CoreDeleteArtistAvatarHandler } from '@core/app/cqrs/artist/commands/delete-artist-avatar/delete-artist-avatar.handler';
import { ArtistUpdateService } from '@core/app/components/artist/services/artist-update.service';

@CommandHandler(DeleteArtistAvatarCommand)
export class DeleteArtistAvatarHandler extends CoreDeleteArtistAvatarHandler {
  constructor(service: ArtistUpdateService) {
    super(service);
  }
}
