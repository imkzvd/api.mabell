import { Inject } from '@nestjs/common';
import { EventHandler } from '@core/app/common/ports/event-bus.port';
import { AlbumCollection } from '@infrastructure/typesense/modules/album/album.collection';
import { ArtistUpdatedEvent } from '@core/app/common/events/artist/artist-updated.event';

export class UpdateAlbumDocumentsOnArtistUpdatedEventHandler extends EventHandler<ArtistUpdatedEvent> {
  constructor(@Inject(AlbumCollection) private readonly _collection: AlbumCollection) {
    super();
  }

  handle(event: ArtistUpdatedEvent) {
    void this._collection.updateArtistsDataByArtistId(event.payload.id, event.payload);
  }
}
