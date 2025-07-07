import { Provider } from '@nestjs/common';
import { AlbumService } from '@core/app/components/album/album.service';
import { EventBus as EventBusPort } from '@core/app/common/ports/event-bus.port';
import { AlbumWriteRepository as AlbumWriteRepositoryPort } from '@core/domain/components/album/repository/album-write-repository.port';
import { AlbumReadRepository as AlbumReadRepositoryPort } from '@core/domain/components/album/repository/album-read-repository.port';
import { IdService as IdServicePort } from '@core/app/common/ports/id.service.port';
import { AlbumId } from '@core/domain/components/album/types';
import { TmpFileStorage as TmpFileStoragePort } from '@core/app/common/ports/file-storages/tmp-file-storage.port';
import { ArtistFileStorage as ArtistFileStoragePort } from '@core/app/common/ports/file-storages/artist-file-storage.port';
import { EventBus } from '@infrastructure/event-bus';
import { AlbumWriteRepository } from '@infrastructure/mongoose/services/album/album-write-repository.service';
import { AlbumReadRepository } from '@infrastructure/mongoose/services/album/album-read-repository.service';
import { RandomIdService } from '@infrastructure/random-id';
import { ArtistFileStorage, TmpFileStorage } from '@infrastructure/file-storage';

export const albumServiceProvider: Provider = {
  provide: AlbumService,
  useFactory: (
    eb: EventBusPort,
    wr: AlbumWriteRepositoryPort,
    rr: AlbumReadRepositoryPort,
    idService: IdServicePort<AlbumId>,
    tmpFS: TmpFileStoragePort,
    artistFS: ArtistFileStoragePort,
  ) => new AlbumService(eb, wr, rr, idService, tmpFS, artistFS),
  inject: [
    EventBus,
    AlbumWriteRepository,
    AlbumReadRepository,
    RandomIdService,
    TmpFileStorage,
    ArtistFileStorage,
  ],
};
