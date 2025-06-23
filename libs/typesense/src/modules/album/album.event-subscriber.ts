import { QueryBus } from '@nestjs/cqrs';
import { EventBus } from '@core/app/common/ports/event-bus.port';
import { AlbumCreatedEvent } from '@core/app/common/events/album-created.event';
import { GetAlbumQuery } from '@core/app/cqrs/album/queries/get-album/get-album.query';
import { AlbumUpdatedEvent } from '@core/app/common/events/album-updated.event';
import { AlbumDeletedEvent } from '@core/app/common/events/album-deleted.event';
import { AlbumsDeletedEvent } from '@core/app/common/events/albums-deleted.event';
import { AlbumCollection } from './album.collection';

export class AlbumEventSubscriber {
  constructor(
    private readonly _QB: QueryBus,
    private readonly _EB: EventBus,
    private readonly _collection: AlbumCollection,
  ) {
    this._EB.subscribe(AlbumCreatedEvent, async ({ id }) => this.saveAlbumDocument(id));
    this._EB.subscribe(AlbumUpdatedEvent, async ({ id }) => this.saveAlbumDocument(id));
    this._EB.subscribe(AlbumDeletedEvent, async ({ id }) => {
      return this._collection.deleteById(id);
    });
    this._EB.subscribe(AlbumsDeletedEvent, async ({ ids }) => {
      return this._collection.deleteByIds(ids);
    });
  }

  async saveAlbumDocument(id: string) {
    const foundAlbum = await this._QB.execute(new GetAlbumQuery(id));

    if (!foundAlbum) {
      return;
    }

    await this._collection.save(foundAlbum);
  }
}
