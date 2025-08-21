import { AlbumDeleteService } from '../services/album-delete.service';
import { EventHandler } from '../../../ports/event-bus/types';
import { ArtistDeletedEvent } from '../../../events';

export class DeleteAlbumsOnArtistDeletedEventHandler extends EventHandler<ArtistDeletedEvent> {
  constructor(private readonly _service: AlbumDeleteService) {
    super();
  }

  handle({ payload }: ArtistDeletedEvent) {
    void this._service.deleteByArtistId(payload.id);
  }
}
