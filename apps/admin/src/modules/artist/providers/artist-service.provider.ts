import { Provider } from '@nestjs/common';
import { ArtistService } from '@core/app/components/artist/artist.service';
import { EventBus as EventBusPort } from '@core/app/common/ports/event-bus.port';
import { ArtistWriteRepository as ArtistWriteRepositoryPort } from '@core/domain/components/artist/repository/artist-write-repository.port';
import { ArtistReadRepository as ArtistReadRepositoryPort } from '@core/domain/components/artist/repository/artist-read-repository.port';
import { IdService as IdServicePort } from '@core/app/common/ports/id.service.port';
import { ArtistId } from '@core/domain/components/artist/types';
import { TmpFileStorage as TmpFileStoragePort } from '@core/app/common/ports/file-storages/tmp-file-storage.port';
import { ArtistFileStorage as ArtistFileStoragePort } from '@core/app/common/ports/file-storages/artist-file-storage.port';
import { EventBus } from '@infrastructure/event-bus';
import { ArtistWriteRepository } from '@infrastructure/mongoose/services/artist/artist-write-repository.service';
import { ArtistReadRepository } from '@infrastructure/mongoose/services/artist/artist-read-repository.service';
import { RandomIdService } from '@infrastructure/random-id';
import { ArtistFileStorage, TmpFileStorage } from '@infrastructure/file-storage';

export const artistServiceProvider: Provider = {
  provide: ArtistService,
  useFactory: (
    eb: EventBusPort,
    wr: ArtistWriteRepositoryPort,
    rr: ArtistReadRepositoryPort,
    idService: IdServicePort<ArtistId>,
    tmpFS: TmpFileStoragePort,
    artistFS: ArtistFileStoragePort,
  ) => new ArtistService(eb, wr, rr, idService, tmpFS, artistFS),
  inject: [
    EventBus,
    ArtistWriteRepository,
    ArtistReadRepository,
    RandomIdService,
    TmpFileStorage,
    ArtistFileStorage,
  ],
};
