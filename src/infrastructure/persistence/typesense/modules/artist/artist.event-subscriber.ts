import { Inject } from '@nestjs/common';
import { EVENT_BUS_DI_TOKEN, EventBus } from '../../../../../core/app/common/ports/event-bus.port';
import { ArtistCollection } from './artist.collection';
import { ArtistCreatedEvent } from '../../../../../core/app/common/events/artist-created.event';
import { ArtistUpdatedEvent } from '../../../../../core/app/common/events/artist-updated.event';
import { ArtistDeletedEvent } from '../../../../../core/app/common/events/artist-deleted.event';
import { QueryBus } from '@nestjs/cqrs';
import { GetArtistQuery } from '../../../../../core/app/cqrs/artist/queries/get-artist/get-artist.query';

export class ArtistEventSubscriber {
  constructor(
    private readonly _QB: QueryBus,
    @Inject(EVENT_BUS_DI_TOKEN) private readonly _EB: EventBus,
    @Inject(ArtistCollection) private readonly _collection: ArtistCollection,
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
