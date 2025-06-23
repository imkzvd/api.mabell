import { QueryBus } from '@nestjs/cqrs';
import { EventBus } from '@core/app/common/ports/event-bus.port';
import { ArtistCreatedEvent } from '@core/app/common/events/artist-created.event';
import { ArtistUpdatedEvent } from '@core/app/common/events/artist-updated.event';
import { ArtistDeletedEvent } from '@core/app/common/events/artist-deleted.event';
import { GetArtistQuery } from '@core/app/cqrs/artist/queries/get-artist/get-artist.query';
import { ArtistCollection } from './artist.collection';

export class ArtistEventSubscriber {
  constructor(
    private readonly _QB: QueryBus,
    private readonly _EB: EventBus,
    private readonly _collection: ArtistCollection,
  ) {
    this._EB.subscribe(ArtistCreatedEvent, async ({ id }) => this.saveArtistDocument(id));
    this._EB.subscribe(ArtistUpdatedEvent, async ({ id }) => this.saveArtistDocument(id));
    this._EB.subscribe(ArtistDeletedEvent, async ({ id }) => {
      return this._collection.deleteById(id);
    });
  }

  async saveArtistDocument(id: string) {
    const foundArtist = await this._QB.execute(new GetArtistQuery(id));

    if (!foundArtist) return;

    await this._collection.save(foundArtist);
  }
}
