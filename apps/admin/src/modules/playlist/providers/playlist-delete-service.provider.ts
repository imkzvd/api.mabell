import { Provider } from '@nestjs/common';
import { App } from '@api.mabell/core';
import { EventBus } from '@api.mabell/event-bus';
import { PlaylistDBModule } from '@api.mabell/db';
import { UserFileStorage } from '@api.mabell/file-storage';

export const playlistDeleteServiceProvider: Provider = {
  provide: App.Components.Playlist.PlaylistDeleteService,
  useFactory: (eb, wr, userFS) => new App.Components.Playlist.PlaylistDeleteService(eb, wr, userFS),
  inject: [EventBus, PlaylistDBModule.PlaylistWriteRepository, UserFileStorage],
};
