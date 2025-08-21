import { Provider } from '@nestjs/common';
import { App } from '@api.mabell/core';
import { EventBus } from '@api.mabell/event-bus';
import { PlaylistDBModule } from '@api.mabell/db';
import { TmpFileStorage, UserFileStorage } from '@api.mabell/file-storage';

export const playlistUpdateServiceProvider: Provider = {
  provide: App.Components.Playlist.PlaylistUpdateService,
  useFactory: (eb, wr, rr, tmpFS, userFS) =>
    new App.Components.Playlist.PlaylistUpdateService(eb, wr, rr, tmpFS, userFS),
  inject: [
    EventBus,
    PlaylistDBModule.PlaylistWriteRepository,
    PlaylistDBModule.PlaylistReadRepository,
    TmpFileStorage,
    UserFileStorage,
  ],
};
