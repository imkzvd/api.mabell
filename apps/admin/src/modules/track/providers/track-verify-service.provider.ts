import { Provider } from '@nestjs/common';
import { App } from '@api.mabell/core';
import { TrackDBModule } from '@api.mabell/db';

export const trackVerifyServiceProvider: Provider = {
  provide: App.Components.Track.TrackVerifyService,
  useFactory: (wr) => new App.Components.Track.TrackVerifyService(wr),
  inject: [TrackDBModule.TrackWriteRepository],
};
