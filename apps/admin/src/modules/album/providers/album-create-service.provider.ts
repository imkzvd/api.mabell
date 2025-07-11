import { Provider } from '@nestjs/common';
import { AlbumId } from '@core/domain/components/album/types';
import { AlbumWriteRepository as AlbumWriteRepositoryPort } from '@core/domain/components/album/repository/album-write-repository.port';
import { AlbumReadRepository as AlbumReadRepositoryPort } from '@core/domain/components/album/repository/album-read-repository.port';
import { EventBus as EventBusPort } from '@core/app/common/ports/event-bus.port';
import { IdService as IdServicePort } from '@core/app/common/ports/id.service.port';
import { AlbumWriteRepository } from '@infrastructure/mongoose/services/album/album-write-repository.service';
import { AlbumCreateService } from '@core/app/components/album/services/album-create.service';
import { EventBus } from '@infrastructure/event-bus';
import { RandomIdService } from '@infrastructure/random-id';
import { AlbumReadRepository } from '@infrastructure/mongoose/services/album/album-read-repository.service';

export const albumCreateServiceProvider: Provider = {
  provide: AlbumCreateService,
  useFactory: (
    eb: EventBusPort,
    wr: AlbumWriteRepositoryPort,
    rr: AlbumReadRepositoryPort,
    idService: IdServicePort<AlbumId>,
  ) => new AlbumCreateService(eb, wr, rr, idService),
  inject: [EventBus, AlbumWriteRepository, AlbumReadRepository, RandomIdService],
};
