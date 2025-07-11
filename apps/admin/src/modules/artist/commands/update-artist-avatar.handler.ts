import { CommandHandler } from '@nestjs/cqrs';
import { UpdateArtistAvatarCommand } from '@core/app/cqrs/artist/commands/update-artist-avatar/update-artist-avatar.command';
import { UpdateArtistAvatarHandler as CoreUpdateArtistAvatarHandler } from '@core/app/cqrs/artist/commands/update-artist-avatar/update-artist-avatar.handler';
import { ArtistUpdateService } from '@core/app/components/artist/services/artist-update.service';

@CommandHandler(UpdateArtistAvatarCommand)
export class UpdateArtistAvatarHandler extends CoreUpdateArtistAvatarHandler {
  constructor(service: ArtistUpdateService) {
    super(service);
  }
}
