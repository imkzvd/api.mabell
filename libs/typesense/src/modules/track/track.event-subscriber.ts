import { QueryBus } from '@nestjs/cqrs';
import { TrackCollection } from './track.collection';
import { EventBus } from '../../../../../src/core/app/common/ports/event-bus.port';
import { TrackCreatedEvent } from '../../../../../src/core/app/common/events/track-created.event';
import { TrackUpdatedEvent } from '../../../../../src/core/app/common/events/track-updated.event';
import { TrackDeletedEvent } from '../../../../../src/core/app/common/events/track-deleted.event';
import { GetTrackQuery } from '../../../../../src/core/app/cqrs/track/queries/get-track/get-track.query';
import { TracksDeletedEvent } from '../../../../../src/core/app/common/events/tracks-deleted.event';
import { TracksUpdatedEvent } from '../../../../../src/core/app/common/events/tracks-updated.event';
import { GetTracksByIdsQuery } from '../../../../../src/core/app/cqrs/track/queries/get-tracks-by-ids/get-tracks-by-ids.query';
import { AlbumUpdatedEvent } from '../../../../../src/core/app/common/events/album-updated.event';
import { GetAlbumTracksQuery } from '../../../../../src/core/app/cqrs/track/queries/get-album-tracks/get-album-tracks.query';

export class TrackEventSubscriber {
  constructor(
    private readonly _QB: QueryBus,
    private readonly _EB: EventBus,
    private readonly _collection: TrackCollection,
  ) {
    this._EB.subscribe(TrackCreatedEvent, async ({ id }) => this.saveTrackDocument(id));
    this._EB.subscribe(TrackUpdatedEvent, async ({ id }) => this.saveTrackDocument(id));
    this._EB.subscribe(TracksUpdatedEvent, async ({ ids }) => {
      const foundTracks = await this._QB.execute(new GetTracksByIdsQuery(ids));

      if (!foundTracks.total) {
        return;
      }

      await this._collection.saveMany(foundTracks.foundItems);
    });
    this._EB.subscribe(TrackDeletedEvent, async ({ id }) => {
      return this._collection.deleteById(id);
    });
    this._EB.subscribe(TracksDeletedEvent, ({ ids }) => {
      return this._collection.deleteByIds(ids);
    });
    this._EB.subscribe(AlbumUpdatedEvent, async ({ id }) => {
      const foundTracks = await this._QB.execute(new GetAlbumTracksQuery(id));

      if (!foundTracks.total) {
        return;
      }

      await this._collection.saveMany(foundTracks.items);
    });
  }

  async saveTrackDocument(id: string) {
    const foundTrack = await this._QB.execute(new GetTrackQuery(id));

    if (!foundTrack) {
      return;
    }

    await this._collection.save(foundTrack);
  }
}
