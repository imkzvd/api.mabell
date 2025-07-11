import { Provider } from '@nestjs/common';
import { ArtistCreateService } from '@core/app/components/artist/services/artist-create.service';
import { EventBus as EventBusPort } from '@core/app/common/ports/event-bus.port';
import { ArtistWriteRepository as ArtistWriteRepositoryPort } from '@core/domain/components/artist/repository/artist-write-repository.port';
import { IdService as IdServicePort } from '@core/app/common/ports/id.service.port';
import { ArtistId } from '@core/domain/components/artist/types';
import { EventBus } from '@infrastructure/event-bus';
import { ArtistWriteRepository } from '@infrastructure/mongoose/services/artist/artist-write-repository.service';
import { RandomIdService } from '@infrastructure/random-id';

export const artistCreateServiceProvider: Provider = {
  provide: ArtistCreateService,
  useFactory: (
    eb: EventBusPort,
    wr: ArtistWriteRepositoryPort,
    idService: IdServicePort<ArtistId>,
  ) => new ArtistCreateService(eb, wr, idService),
  inject: [EventBus, ArtistWriteRepository, RandomIdService],
};
