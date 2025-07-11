import { Provider } from '@nestjs/common';
import { TrackReadRepository as TrackReadRepositoryPort } from '@core/domain/components/track/repository/track-read-repository.port';
import { TrackReadRepository } from '@infrastructure/mongoose/services/track/track-read-repository.service';
import { TrackService } from '@core/app/components/track/services/track.service';

export const trackServiceProvider: Provider = {
  provide: TrackService,
  useFactory: (rr: TrackReadRepositoryPort) => new TrackService(rr),
  inject: [TrackReadRepository],
};
