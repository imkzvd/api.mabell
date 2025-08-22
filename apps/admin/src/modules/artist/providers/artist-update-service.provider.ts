import { Provider } from '@nestjs/common';
import { App } from '@api.mabell/core';
import { EventBus } from '@api.mabell/event-bus';
import { ArtistDBModule } from '@api.mabell/db';
import { TmpFileStorage, ArtistFileStorage } from '@api.mabell/file-storage';

export const artistUpdateServiceProvider: Provider = {
  provide: App.Components.Artist.ArtistUpdateService,
  useFactory: (eb, wr, tmpFS, artistFS) =>
    new App.Components.Artist.ArtistUpdateService(eb, wr, tmpFS, artistFS),
  inject: [EventBus, ArtistDBModule.ArtistWriteRepository, TmpFileStorage, ArtistFileStorage],
};
