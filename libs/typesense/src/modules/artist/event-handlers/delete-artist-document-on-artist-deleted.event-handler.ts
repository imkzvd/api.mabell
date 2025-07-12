import { Inject } from '@nestjs/common';
import { EventHandler } from '@core/app/common/ports/event-bus.port';
import { ArtistDeletedEvent } from '@core/app/common/events/artist/artist-deleted.event';
import { ArtistCollection } from '@infrastructure/typesense/modules/artist/artist.collection';

export class DeleteArtistDocumentOnArtistDeletedEventHandler extends EventHandler<ArtistDeletedEvent> {
  constructor(@Inject(ArtistCollection) private readonly _collection: ArtistCollection) {
    super();
  }

  handle(event: ArtistDeletedEvent) {
    void this._collection.delete(event.payload.id);
  }
}
