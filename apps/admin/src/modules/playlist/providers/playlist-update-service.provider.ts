import { Provider } from '@nestjs/common';
import { PlaylistUpdateService } from '@core/app/components/playlist/services/playlist-update.service';
import { EventBus as EventBusPort } from '@core/app/common/ports/event-bus.port';
import { PlaylistWriteRepository as PlaylistWriteRepositoryPort } from '@core/domain/components/playlist/repository/playlist-write-repository.port';
import { TmpFileStorage as TmpFileStoragePort } from '@core/app/common/ports/file-storages/tmp-file-storage.port';
import { UserFileStorage as UserFileStoragePort } from '@core/app/common/ports/file-storages/user-file-storage.port';
import { EventBus } from '@infrastructure/event-bus';
import { PlaylistWriteRepository } from '@infrastructure/mongoose/services/playlist/playlist-write-repository.service';
import { TmpFileStorage, UserFileStorage } from '@infrastructure/file-storage';

export const playlistUpdateServiceProvider: Provider = {
  provide: PlaylistUpdateService,
  useFactory: (
    eb: EventBusPort,
    wr: PlaylistWriteRepositoryPort,
    tmpFS: TmpFileStoragePort,
    userFS: UserFileStoragePort,
  ) => new PlaylistUpdateService(eb, wr, tmpFS, userFS),
  inject: [EventBus, PlaylistWriteRepository, TmpFileStorage, UserFileStorage],
};
