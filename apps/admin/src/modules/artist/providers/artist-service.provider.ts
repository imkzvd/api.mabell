import { Provider } from '@nestjs/common';
import { App } from '@api.mabell/core';
import { ArtistDBModule } from '@api.mabell/db';

export const artistServiceProvider: Provider = {
  provide: App.Components.Artist.ArtistService,
  useFactory: (rr) => new App.Components.Artist.ArtistService(rr),
  inject: [ArtistDBModule.ArtistReadRepository],
};
