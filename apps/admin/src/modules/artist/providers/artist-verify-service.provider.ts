import { Provider } from '@nestjs/common';
import { App } from '@api.mabell/core';
import { ArtistDBModule } from '@api.mabell/db';

export const artistVerifyServiceProvider: Provider = {
  provide: App.Components.Artist.ArtistVerifyService,
  useFactory: (wr) => new App.Components.Artist.ArtistVerifyService(wr),
  inject: [ArtistDBModule.ArtistWriteRepository],
};
