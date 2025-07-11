import { Provider } from '@nestjs/common';
import { AlbumWriteRepository as AlbumWriteRepositoryPort } from '@core/domain/components/album/repository/album-write-repository.port';
import { AlbumReadRepository as AlbumReadRepositoryPort } from '@core/domain/components/album/repository/album-read-repository.port';
import { EventBus as EventBusPort } from '@core/app/common/ports/event-bus.port';
import { AlbumWriteRepository } from '@infrastructure/mongoose/services/album/album-write-repository.service';
import { EventBus } from '@infrastructure/event-bus';
import { AlbumUpdateService } from '@core/app/components/album/services/album-update.service';
import { TmpFileStorage as TmpFileStoragePort } from '@core/app/common/ports/file-storages/tmp-file-storage.port';
import { ArtistFileStorage as ArtistFileStoragePort } from '@core/app/common/ports/file-storages/artist-file-storage.port';
import { ArtistFileStorage, TmpFileStorage } from '@infrastructure/file-storage';
import { AlbumReadRepository } from '@infrastructure/mongoose/services/album/album-read-repository.service';

export const albumUpdateServiceProvider: Provider = {
  provide: AlbumUpdateService,
  useFactory: (
    eb: EventBusPort,
    wr: AlbumWriteRepositoryPort,
    rr: AlbumReadRepositoryPort,
    tmpFS: TmpFileStoragePort,
    artistFS: ArtistFileStoragePort,
  ) => new AlbumUpdateService(eb, wr, rr, tmpFS, artistFS),
  inject: [EventBus, AlbumWriteRepository, AlbumReadRepository, TmpFileStorage, ArtistFileStorage],
};
