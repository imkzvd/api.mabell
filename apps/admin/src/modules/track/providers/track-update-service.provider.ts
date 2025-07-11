import { Provider } from '@nestjs/common';
import { EventBus as EventBusPort } from '@core/app/common/ports/event-bus.port';
import { TrackWriteRepository as TrackWriteRepositoryPort } from '@core/domain/components/track/repository/track-write-repository.port';
import { TrackReadRepository as TrackReadRepositoryPort } from '@core/domain/components/track/repository/track-read-repository.port';
import { EventBus } from '@infrastructure/event-bus';
import { TrackWriteRepository } from '@infrastructure/mongoose/services/track/track-write-repository.service';
import { ArtistFileStorage as ArtistFileStoragePort } from '@core/app/common/ports/file-storages/artist-file-storage.port';
import { ArtistFileStorage, TmpFileStorage } from '@infrastructure/file-storage';
import { TrackUpdateService } from '@core/app/components/track/services/track-update.service';
import { TmpFileStorage as TmpFileStoragePort } from '@core/app/common/ports/file-storages/tmp-file-storage.port';
import { TrackReadRepository } from '@infrastructure/mongoose/services/track/track-read-repository.service';

export const trackUpdateServiceProvider: Provider = {
  provide: TrackUpdateService,
  useFactory: (
    eb: EventBusPort,
    wr: TrackWriteRepositoryPort,
    rr: TrackReadRepositoryPort,
    tmpFS: TmpFileStoragePort,
    artistFS: ArtistFileStoragePort,
  ) => new TrackUpdateService(eb, wr, rr, tmpFS, artistFS),
  inject: [EventBus, TrackWriteRepository, TrackReadRepository, TmpFileStorage, ArtistFileStorage],
};
