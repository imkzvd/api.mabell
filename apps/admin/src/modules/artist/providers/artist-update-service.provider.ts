import { Provider } from '@nestjs/common';
import { EventBus as EventBusPort } from '@core/app/common/ports/event-bus.port';
import { ArtistWriteRepository as ArtistWriteRepositoryPort } from '@core/domain/components/artist/repository/artist-write-repository.port';
import { EventBus } from '@infrastructure/event-bus';
import { ArtistWriteRepository } from '@infrastructure/mongoose/services/artist/artist-write-repository.service';
import { ArtistUpdateService } from '@core/app/components/artist/services/artist-update.service';
import { TmpFileStorage as TmpFileStoragePort } from '@core/app/common/ports/file-storages/tmp-file-storage.port';
import { ArtistFileStorage as ArtistFileStoragePort } from '@core/app/common/ports/file-storages/artist-file-storage.port';
import { ArtistFileStorage, TmpFileStorage } from '@infrastructure/file-storage';

export const artistUpdateServiceProvider: Provider = {
  provide: ArtistUpdateService,
  useFactory: (
    eb: EventBusPort,
    wr: ArtistWriteRepositoryPort,
    tmpFS: TmpFileStoragePort,
    artistFS: ArtistFileStoragePort,
  ) => new ArtistUpdateService(eb, wr, tmpFS, artistFS),
  inject: [EventBus, ArtistWriteRepository, TmpFileStorage, ArtistFileStorage],
};
