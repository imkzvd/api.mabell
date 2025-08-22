import { Provider } from '@nestjs/common';
import { App } from '@api.mabell/core';
import { PlaylistDBModule } from '@api.mabell/db';

export const playlistServiceProvider: Provider = {
  provide: App.Components.Playlist.PlaylistService,
  useFactory: (rr) => new App.Components.Playlist.PlaylistService(rr),
  inject: [PlaylistDBModule.PlaylistReadRepository],
};
