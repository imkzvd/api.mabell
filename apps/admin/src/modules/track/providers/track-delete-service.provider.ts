import { Provider } from '@nestjs/common';
import { App } from '@api.mabell/core';
import { EventBus } from '@api.mabell/event-bus';
import { TrackDBModule } from '@api.mabell/db';
import { ArtistFileStorage } from '@api.mabell/file-storage';

export const trackDeleteServiceProvider: Provider = {
  provide: App.Components.Track.TrackDeleteService,
  useFactory: (eb, wr, artistFS) => new App.Components.Track.TrackDeleteService(eb, wr, artistFS),
  inject: [EventBus, TrackDBModule.TrackWriteRepository, ArtistFileStorage],
};
