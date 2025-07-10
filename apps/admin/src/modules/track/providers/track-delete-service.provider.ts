import { Provider } from '@nestjs/common';
import { EventBus as EventBusPort } from '@core/app/common/ports/event-bus.port';
import { TrackWriteRepository as TrackWriteRepositoryPort } from '@core/domain/components/track/repository/track-write-repository.port';
import { EventBus } from '@infrastructure/event-bus';
import { TrackWriteRepository } from '@infrastructure/mongoose/services/track/track-write-repository.service';
import { TrackDeleteService } from '@core/app/components/track/services/track-delete.service';
import { ArtistFileStorage as ArtistFileStoragePort } from '@core/app/common/ports/file-storages/artist-file-storage.port';
import { ArtistFileStorage } from '@infrastructure/file-storage';

export const trackDeleteServiceProvider: Provider = {
  provide: TrackDeleteService,
  useFactory: (eb: EventBusPort, wr: TrackWriteRepositoryPort, artistFS: ArtistFileStoragePort) =>
    new TrackDeleteService(eb, wr, artistFS),
  inject: [EventBus, TrackWriteRepository, ArtistFileStorage],
};
