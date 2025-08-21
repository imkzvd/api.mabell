import { Provider } from '@nestjs/common';
import { App } from '@api.mabell/core';
import { AlbumDBModule } from '@api.mabell/db';

export const albumServiceProvider: Provider = {
  provide: App.Components.Album.AlbumService,
  useFactory: (wr, rr) => new App.Components.Album.AlbumService(wr, rr),
  inject: [AlbumDBModule.AlbumWriteRepository, AlbumDBModule.AlbumReadRepository],
};
