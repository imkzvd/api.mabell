import { Provider } from '@nestjs/common';
import { EventBus as EventBusPort } from '@core/app/common/ports/event-bus.port';
import { TrackWriteRepository as TrackWriteRepositoryPort } from '@core/domain/components/track/repository/track-write-repository.port';
import { EventBus } from '@infrastructure/event-bus';
import { TrackWriteRepository } from '@infrastructure/mongoose/services/track/track-write-repository.service';
import { ArtistFileStorage as ArtistFileStoragePort } from '@core/app/common/ports/file-storages/artist-file-storage.port';
import { ArtistFileStorage, TmpFileStorage } from '@infrastructure/file-storage';
import { TrackUpdateService } from '@core/app/components/track/services/track-update.service';
import { TmpFileStorage as TmpFileStoragePort } from '@core/app/common/ports/file-storages/tmp-file-storage.port';

export const trackUpdateServiceProvider: Provider = {
  provide: TrackUpdateService,
  useFactory: (
    eb: EventBusPort,
    wr: TrackWriteRepositoryPort,
    tmpFS: TmpFileStoragePort,
    artistFS: ArtistFileStoragePort,
  ) => new TrackUpdateService(eb, wr, tmpFS, artistFS),
  inject: [EventBus, TrackWriteRepository, TmpFileStorage, ArtistFileStorage],
};
