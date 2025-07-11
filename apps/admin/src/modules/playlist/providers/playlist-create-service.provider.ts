import { Provider } from '@nestjs/common';
import { EventBus as EventBusPort } from '@core/app/common/ports/event-bus.port';
import { PlaylistWriteRepository as PlaylistWriteRepositoryPort } from '@core/domain/components/playlist/repository/playlist-write-repository.port';
import { PlaylistReadRepository as PlaylistReadRepositoryPort } from '@core/domain/components/playlist/repository/playlist-read-repository.port';
import { EventBus } from '@infrastructure/event-bus';
import { PlaylistWriteRepository } from '@infrastructure/mongoose/services/playlist/playlist-write-repository.service';
import { PlaylistCreateService } from '@core/app/components/playlist/services/playlist-create.service';
import { IdService } from '@core/app/common/ports/id.service.port';
import { PlaylistId } from '@core/domain/components/playlist/types';
import { RandomIdService } from '@infrastructure/random-id';
import { PlaylistReadRepository } from '@infrastructure/mongoose/services/playlist/playlist-read-repository.service';

export const playlistCreateServiceProvider: Provider = {
  provide: PlaylistCreateService,
  useFactory: (
    eb: EventBusPort,
    wr: PlaylistWriteRepositoryPort,
    rr: PlaylistReadRepositoryPort,
    idService: IdService<PlaylistId>,
  ) => new PlaylistCreateService(eb, wr, rr, idService),
  inject: [EventBus, PlaylistWriteRepository, PlaylistReadRepository, RandomIdService],
};
