import { TrackDeleteService } from '../services/track-delete.service';
import { EventHandler } from '../../../ports/event-bus/types';
import { ArtistDeletedEvent } from '../../../events';

export class DeleteTracksOnArtistDeletedEventHandler extends EventHandler<ArtistDeletedEvent> {
  constructor(private readonly _service: TrackDeleteService) {
    super();
  }

  handle({ payload }: ArtistDeletedEvent) {
    void this._service.deleteByArtistId(payload.id);
  }
}
