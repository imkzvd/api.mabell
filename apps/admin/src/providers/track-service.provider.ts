import { Provider } from '@nestjs/common';
import { TrackService } from '@core/app/components/track/track.service';
import { EventBus as EventBusPort } from '@core/app/common/ports/event-bus.port';
import { TrackWriteRepository as TrackWriteRepositoryPort } from '@core/domain/components/track/repository/track-write-repository.port';
import { TrackReadRepository as TrackReadRepositoryPort } from '@core/domain/components/track/repository/track-read-repository.port';
import { IdService as IdServicePort } from '@core/app/common/ports/id.service.port';
import { TrackId } from '@core/domain/components/track/types';
import { TmpFileStorage as TmpFileStoragePort } from '@core/app/common/ports/file-storages/tmp-file-storage.port';
import { ArtistFileStorage as ArtistFileStoragePort } from '@core/app/common/ports/file-storages/artist-file-storage.port';
import { EventBus } from '@infrastructure/event-bus';
import { TrackWriteRepository } from '@infrastructure/mongoose/services/track/track-write-repository.service';
import { TrackReadRepository } from '@infrastructure/mongoose/services/track/track-read-repository.service';
import { RandomIdService } from '@infrastructure/random-id';
import { ArtistFileStorage, TmpFileStorage } from '@infrastructure/file-storage';

export const trackServiceProvider: Provider = {
  provide: TrackService,
  useFactory: (
    eb: EventBusPort,
    wr: TrackWriteRepositoryPort,
    rr: TrackReadRepositoryPort,
    idService: IdServicePort<TrackId>,
    tmpFS: TmpFileStoragePort,
    artistFS: ArtistFileStoragePort,
  ) => new TrackService(eb, wr, rr, idService, tmpFS, artistFS),
  inject: [
    EventBus,
    TrackWriteRepository,
    TrackReadRepository,
    RandomIdService,
    TmpFileStorage,
    ArtistFileStorage,
  ],
};
