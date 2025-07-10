import { Provider } from '@nestjs/common';
import { EventBus as EventBusPort } from '@core/app/common/ports/event-bus.port';
import { PlaylistWriteRepository as PlaylistWriteRepositoryPort } from '@core/domain/components/playlist/repository/playlist-write-repository.port';
import { UserFileStorage as UserFileStoragePort } from '@core/app/common/ports/file-storages/user-file-storage.port';
import { EventBus } from '@infrastructure/event-bus';
import { PlaylistWriteRepository } from '@infrastructure/mongoose/services/playlist/playlist-write-repository.service';
import { UserFileStorage } from '@infrastructure/file-storage';
import { PlaylistDeleteService } from '@core/app/components/playlist/services/playlist-delete.service';

export const playlistDeleteServiceProvider: Provider = {
  provide: PlaylistDeleteService,
  useFactory: (eb: EventBusPort, wr: PlaylistWriteRepositoryPort, userFS: UserFileStoragePort) =>
    new PlaylistDeleteService(eb, wr, userFS),
  inject: [EventBus, PlaylistWriteRepository, UserFileStorage],
};
