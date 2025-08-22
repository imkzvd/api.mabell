import { Provider } from '@nestjs/common';
import { App } from '@api.mabell/core';
import { EventBus } from '@api.mabell/event-bus';
import { AlbumDBModule } from '@api.mabell/db';
import { RandomIdService } from '@api.mabell/random-id';

export const albumCreateServiceProvider: Provider = {
  provide: App.Components.Album.AlbumCreateService,
  useFactory: (eb, wr, rr, idService) =>
    new App.Components.Album.AlbumCreateService(eb, wr, rr, idService),
  inject: [
    EventBus,
    AlbumDBModule.AlbumWriteRepository,
    AlbumDBModule.AlbumReadRepository,
    RandomIdService,
  ],
};
