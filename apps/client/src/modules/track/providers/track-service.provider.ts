import { Provider } from '@nestjs/common';
import { App } from '@api.mabell/core';
import { TrackDBModule } from '@api.mabell/db';

export const trackServiceProvider: Provider = {
  provide: App.Components.Track.TrackService,
  useFactory: (rr) => new App.Components.Track.TrackService(rr),
  inject: [TrackDBModule.TrackReadRepository],
};
