import { Provider } from '@nestjs/common';
import { PlaylistService } from '@core/app/components/playlist/playlist.service';
import { EventBus as EventBusPort } from '@core/app/common/ports/event-bus.port';
import { PlaylistWriteRepository as PlaylistWriteRepositoryPort } from '@core/domain/components/playlist/repository/playlist-write-repository.port';
import { PlaylistReadRepository as PlaylistReadRepositoryPort } from '@core/domain/components/playlist/repository/playlist-read-repository.port';
import { IdService as IdServicePort } from '@core/app/common/ports/id.service.port';
import { PlaylistId } from '@core/domain/components/playlist/types';
import { TmpFileStorage as TmpFileStoragePort } from '@core/app/common/ports/file-storages/tmp-file-storage.port';
import { UserFileStorage as UserFileStoragePort } from '@core/app/common/ports/file-storages/user-file-storage.port';
import { EventBus } from '@infrastructure/event-bus';
import { PlaylistWriteRepository } from '@infrastructure/mongoose/services/playlist/playlist-write-repository.service';
import { PlaylistReadRepository } from '@infrastructure/mongoose/services/playlist/playlist-read-repository.service';
import { RandomIdService } from '@infrastructure/random-id';
import { TmpFileStorage, UserFileStorage } from '@infrastructure/file-storage';

export const playlistServiceProvider: Provider = {
  provide: PlaylistService,
  useFactory: (
    eb: EventBusPort,
    wr: PlaylistWriteRepositoryPort,
    rr: PlaylistReadRepositoryPort,
    idService: IdServicePort<PlaylistId>,
    tmpFS: TmpFileStoragePort,
    userFS: UserFileStoragePort,
  ) => new PlaylistService(eb, wr, rr, idService, tmpFS, userFS),
  inject: [
    EventBus,
    PlaylistWriteRepository,
    PlaylistReadRepository,
    RandomIdService,
    TmpFileStorage,
    UserFileStorage,
  ],
};
