import { TrackDeleteService } from '../services/track-delete.service';
import { EventHandler } from '../../../ports/event-bus/types';
import { AlbumDeletedEvent } from '../../../events';

export class DeleteTracksOnAlbumDeletedEventHandler extends EventHandler<AlbumDeletedEvent> {
  constructor(private readonly _service: TrackDeleteService) {
    super();
  }

  handle({ payload }: AlbumDeletedEvent) {
    void this._service.deleteByAlbumId(payload.id);
  }
}
