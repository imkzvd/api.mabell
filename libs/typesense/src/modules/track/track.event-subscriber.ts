import { Inject } from '@nestjs/common';
import { EventBus } from '@infrastructure/event-bus';
import { QueryBus } from '@infrastructure/query-bus';
import { TrackCreatedEvent } from '@core/app/common/events/track-created.event';
import { TrackUpdatedEvent } from '@core/app/common/events/track-updated.event';
import { TrackDeletedEvent } from '@core/app/common/events/track-deleted.event';
import { GetTrackQuery } from '@core/app/cqrs/track/queries/get-track/get-track.query';
import { TracksDeletedEvent } from '@core/app/common/events/tracks-deleted.event';
import { TracksUpdatedEvent } from '@core/app/common/events/tracks-updated.event';
import { GetTracksByIdsQuery } from '@core/app/cqrs/track/queries/get-tracks-by-ids/get-tracks-by-ids.query';
import { AlbumUpdatedEvent } from '@core/app/common/events/album-updated.event';
import { GetAlbumTracksQuery } from '@core/app/cqrs/track/queries/get-album-tracks/get-album-tracks.query';
import { TrackCollection } from './track.collection';

export class TrackEventSubscriber {
  constructor(
    @Inject(QueryBus) private readonly _QB: QueryBus,
    @Inject(EventBus) private readonly _EB: EventBus,
    @Inject(TrackCollection) private readonly _collection: TrackCollection,
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
