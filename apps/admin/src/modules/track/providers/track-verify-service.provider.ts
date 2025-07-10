import { Provider } from '@nestjs/common';
import { TrackWriteRepository as TrackWriteRepositoryPort } from '@core/domain/components/track/repository/track-write-repository.port';
import { TrackWriteRepository } from '@infrastructure/mongoose/services/track/track-write-repository.service';
import { TrackVerifyService } from '@core/app/components/track/services/track-verify.service';

export const trackVerifyServiceProvider: Provider = {
  provide: TrackVerifyService,
  useFactory: (wr: TrackWriteRepositoryPort) => new TrackVerifyService(wr),
  inject: [TrackWriteRepository],
};
