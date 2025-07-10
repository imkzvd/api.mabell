import { Provider } from '@nestjs/common';
import { TrackCreateService } from '@core/app/components/track/services/track-create.service';
import { EventBus as EventBusPort } from '@core/app/common/ports/event-bus.port';
import { TrackWriteRepository as TrackWriteRepositoryPort } from '@core/domain/components/track/repository/track-write-repository.port';
import { IdService as IdServicePort } from '@core/app/common/ports/id.service.port';
import { TrackId } from '@core/domain/components/track/types';
import { EventBus } from '@infrastructure/event-bus';
import { TrackWriteRepository } from '@infrastructure/mongoose/services/track/track-write-repository.service';
import { RandomIdService } from '@infrastructure/random-id';

export const trackCreateServiceProvider: Provider = {
  provide: TrackCreateService,
  useFactory: (eb: EventBusPort, wr: TrackWriteRepositoryPort, idService: IdServicePort<TrackId>) =>
    new TrackCreateService(eb, wr, idService),
  inject: [EventBus, TrackWriteRepository, RandomIdService],
};
