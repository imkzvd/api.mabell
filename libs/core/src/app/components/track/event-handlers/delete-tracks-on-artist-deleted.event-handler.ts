import { EventHandler } from '@core/app/common/ports/event-bus.port';
import { ArtistDeletedEvent } from '@core/app/common/events/artist/artist-deleted.event';
import { TrackDeleteService } from '@core/app/components/track/services/track-delete.service';

export class DeleteTracksOnArtistDeletedEventHandler extends EventHandler<ArtistDeletedEvent> {
  constructor(private readonly _service: TrackDeleteService) {
    super();
  }

  handle({ payload }: ArtistDeletedEvent) {
    void this._service.deleteByArtistId(payload.id);
  }
}
