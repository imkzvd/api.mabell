import { Provider } from '@nestjs/common';
import { App } from '@api.mabell/core';
import { EventBus } from '@api.mabell/event-bus';
import { TrackDBModule } from '@api.mabell/db';
import { RandomIdService } from '@api.mabell/random-id';

export const trackCreateServiceProvider: Provider = {
  provide: App.Components.Track.TrackCreateService,
  useFactory: (eb, wr, rr, idService) =>
    new App.Components.Track.TrackCreateService(eb, wr, rr, idService),
  inject: [
    EventBus,
    TrackDBModule.TrackWriteRepository,
    TrackDBModule.TrackReadRepository,
    RandomIdService,
  ],
};
