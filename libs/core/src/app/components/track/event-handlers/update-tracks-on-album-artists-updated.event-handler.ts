import { EventHandler } from '../../../ports';
import { AlbumArtistsUpdatedEvent } from '../../../events';
import { TrackUpdateService } from '../services/track-update.service';

export class UpdateTracksOnAlbumArtistsUpdatedEventHandler extends EventHandler<AlbumArtistsUpdatedEvent> {
  constructor(private readonly _service: TrackUpdateService) {
    super();
  }

  handle({ payload }: AlbumArtistsUpdatedEvent) {
    void this._service.updateArtistsByAlbumId(payload.id, {
      artistIds: payload.artists.map(({ id }) => id),
    });
  }
}
