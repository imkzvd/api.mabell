import { Provider } from '@nestjs/common';
import { App } from '@api.mabell/core';
import { EventBus } from '@api.mabell/event-bus';
import { AlbumDBModule } from '@api.mabell/db';

export const albumDeleteServiceProvider: Provider = {
  provide: App.Components.Album.AlbumDeleteService,
  useFactory: (eb, wr) => new App.Components.Album.AlbumDeleteService(eb, wr),
  inject: [EventBus, AlbumDBModule.AlbumWriteRepository],
};
