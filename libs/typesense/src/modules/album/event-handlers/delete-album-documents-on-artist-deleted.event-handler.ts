import { Inject } from '@nestjs/common';
import { EventHandler } from '@core/app/common/ports/event-bus.port';
import { ArtistDeletedEvent } from '@core/app/common/events/artist/artist-deleted.event';
import { AlbumCollection } from '@infrastructure/typesense/modules/album/album.collection';

export class DeleteAlbumDocumentsOnArtistDeletedEventHandler extends EventHandler<ArtistDeletedEvent> {
  constructor(@Inject(AlbumCollection) private readonly _collection: AlbumCollection) {
    super();
  }

  handle(event: ArtistDeletedEvent) {
    void this._collection.deleteByArtistId(event.payload.id);
  }
}
