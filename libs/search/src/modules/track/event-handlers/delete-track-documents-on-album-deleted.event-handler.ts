import { Inject } from '@nestjs/common';
import { App } from '@api.mabell/core';
import { TrackCollection } from '../track.collection';

export class DeleteTrackDocumentsOnAlbumDeletedEventHandler extends App.Ports
  .EventHandler<App.Events.AlbumDeletedEvent> {
  constructor(@Inject(TrackCollection) private readonly _collection: TrackCollection) {
    super();
  }

  handle(event: App.Events.AlbumDeletedEvent) {
    void this._collection.deleteByAlbumId(event.payload.id);
  }
}
