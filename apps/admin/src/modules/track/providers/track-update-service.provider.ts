import { Provider } from '@nestjs/common';
import { App } from '@api.mabell/core';
import { EventBus } from '@api.mabell/event-bus';
import { TrackDBModule } from '@api.mabell/db';
import { TmpFileStorage, ArtistFileStorage } from '@api.mabell/file-storage';

export const trackUpdateServiceProvider: Provider = {
  provide: App.Components.Track.TrackUpdateService,
  useFactory: (eb, wr, rr, tmpFS, artistFS) =>
    new App.Components.Track.TrackUpdateService(eb, wr, rr, tmpFS, artistFS),
  inject: [
    EventBus,
    TrackDBModule.TrackWriteRepository,
    TrackDBModule.TrackReadRepository,
    TmpFileStorage,
    ArtistFileStorage,
  ],
};
