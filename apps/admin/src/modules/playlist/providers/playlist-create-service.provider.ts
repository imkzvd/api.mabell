import { Provider } from '@nestjs/common';
import { App } from '@api.mabell/core';
import { EventBus } from '@api.mabell/event-bus';
import { PlaylistDBModule } from '@api.mabell/db';
import { RandomIdService } from '@api.mabell/random-id';

export const playlistCreateServiceProvider: Provider = {
  provide: App.Components.Playlist.PlaylistCreateService,
  useFactory: (eb, wr, rr, idService) =>
    new App.Components.Playlist.PlaylistCreateService(eb, wr, rr, idService),
  inject: [
    EventBus,
    PlaylistDBModule.PlaylistWriteRepository,
    PlaylistDBModule.PlaylistReadRepository,
    RandomIdService,
  ],
};
