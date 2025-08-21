import { Provider } from '@nestjs/common';
import { App } from '@api.mabell/core';
import { EventBus } from '@api.mabell/event-bus';
import { ArtistDBModule } from '@api.mabell/db';
import { RandomIdService } from '@api.mabell/random-id';

export const artistCreateServiceProvider: Provider = {
  provide: App.Components.Artist.ArtistCreateService,
  useFactory: (eb, wr, idService) =>
    new App.Components.Artist.ArtistCreateService(eb, wr, idService),
  inject: [EventBus, ArtistDBModule.ArtistWriteRepository, RandomIdService],
};
