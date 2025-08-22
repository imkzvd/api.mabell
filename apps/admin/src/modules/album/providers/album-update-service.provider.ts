import { Provider } from '@nestjs/common';
import { App } from '@api.mabell/core';
import { EventBus } from '@api.mabell/event-bus';
import { AlbumDBModule } from '@api.mabell/db';
import { TmpFileStorage, ArtistFileStorage } from '@api.mabell/file-storage';

export const albumUpdateServiceProvider: Provider = {
  provide: App.Components.Album.AlbumUpdateService,
  useFactory: (eb, wr, rr, tmpFS, artistFS) =>
    new App.Components.Album.AlbumUpdateService(eb, wr, rr, tmpFS, artistFS),
  inject: [
    EventBus,
    AlbumDBModule.AlbumWriteRepository,
    AlbumDBModule.AlbumReadRepository,
    TmpFileStorage,
    ArtistFileStorage,
  ],
};
