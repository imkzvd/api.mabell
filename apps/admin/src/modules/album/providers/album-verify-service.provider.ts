import { Provider } from '@nestjs/common';
import { App } from '@api.mabell/core';
import { AlbumDBModule } from '@api.mabell/db';

export const albumVerifyServiceProvider: Provider = {
  provide: App.Components.Album.AlbumVerifyService,
  useFactory: (wr) => new App.Components.Album.AlbumVerifyService(wr),
  inject: [AlbumDBModule.AlbumWriteRepository],
};
