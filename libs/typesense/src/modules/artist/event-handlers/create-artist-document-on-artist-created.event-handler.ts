import { Inject } from '@nestjs/common';
import { EventHandler } from '@core/app/common/ports/event-bus.port';
import { ArtistUpdatedEvent } from '@core/app/common/events/artist/artist-updated.event';
import { ArtistCreatedEvent } from '@core/app/common/events/artist/artist-created.event';
import { ArtistCollection } from '@infrastructure/typesense/modules/artist/artist.collection';

export class CreateArtistDocumentOnArtistCreatedEventHandler extends EventHandler<
  ArtistCreatedEvent | ArtistUpdatedEvent
> {
  constructor(@Inject(ArtistCollection) private readonly _collection: ArtistCollection) {
    super();
  }

  handle(event: ArtistCreatedEvent | ArtistUpdatedEvent) {
    void this._collection.save(event.payload);
  }
}
