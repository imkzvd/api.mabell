import { EventHandler } from '@core/app/common/ports/event-bus.port';
import { AlbumDeletedEvent } from '@core/app/common/events/album/album-deleted.event';
import { TrackDeleteService } from '@core/app/components/track/services/track-delete.service';

export class DeleteTracksOnAlbumDeletedEventHandler extends EventHandler<AlbumDeletedEvent> {
  constructor(private readonly _service: TrackDeleteService) {
    super();
  }

  handle({ payload }: AlbumDeletedEvent) {
    void this._service.deleteByAlbumId(payload.id);
  }
}
