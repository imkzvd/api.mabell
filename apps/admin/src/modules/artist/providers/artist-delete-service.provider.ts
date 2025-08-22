import { Provider } from '@nestjs/common';
import { App } from '@api.mabell/core';
import { EventBus } from '@api.mabell/event-bus';
import { ArtistDBModule } from '@api.mabell/db';
import { ArtistFileStorage } from '@api.mabell/file-storage';

export const artistDeleteServiceProvider: Provider = {
  provide: App.Components.Artist.ArtistDeleteService,
  useFactory: (eb, wr, artistFS) => new App.Components.Artist.ArtistDeleteService(eb, wr, artistFS),
  inject: [EventBus, ArtistDBModule.ArtistWriteRepository, ArtistFileStorage],
};
