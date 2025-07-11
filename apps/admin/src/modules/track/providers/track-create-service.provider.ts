import { Provider } from '@nestjs/common';
import { TrackCreateService } from '@core/app/components/track/services/track-create.service';
import { EventBus as EventBusPort } from '@core/app/common/ports/event-bus.port';
import { TrackWriteRepository as TrackWriteRepositoryPort } from '@core/domain/components/track/repository/track-write-repository.port';
import { TrackReadRepository as TrackReadRepositoryPort } from '@core/domain/components/track/repository/track-read-repository.port';
import { IdService as IdServicePort } from '@core/app/common/ports/id.service.port';
import { TrackId } from '@core/domain/components/track/types';
import { EventBus } from '@infrastructure/event-bus';
import { TrackWriteRepository } from '@infrastructure/mongoose/services/track/track-write-repository.service';
import { RandomIdService } from '@infrastructure/random-id';
import { TrackReadRepository } from '@infrastructure/mongoose/services/track/track-read-repository.service';

export const trackCreateServiceProvider: Provider = {
  provide: TrackCreateService,
  useFactory: (
    eb: EventBusPort,
    wr: TrackWriteRepositoryPort,
    rr: TrackReadRepositoryPort,
    idService: IdServicePort<TrackId>,
  ) => new TrackCreateService(eb, wr, rr, idService),
  inject: [EventBus, TrackWriteRepository, TrackReadRepository, RandomIdService],
};
