import { CommandHandler } from '@nestjs/cqrs';
import { CreateTrackCommand } from '@core/app/cqrs/track/commands/create-track/create-track.command';
import { CreateTrackHandler as CoreCreateTrackHandler } from '@core/app/cqrs/track/commands/create-track/create-track.handler';
import { AlbumVerifyService } from '@core/app/components/album/services/album-verify.service';
import { AlbumService } from '@core/app/components/album/services/album.service';
import { TrackCreateService } from '@core/app/components/track/services/track-create.service';

@CommandHandler(CreateTrackCommand)
export class CreateTrackHandler extends CoreCreateTrackHandler {
  constructor(
    albumVerifyService: AlbumVerifyService,
    albumService: AlbumService,
    trackCreateService: TrackCreateService,
  ) {
    super(albumVerifyService, albumService, trackCreateService);
  }
}
