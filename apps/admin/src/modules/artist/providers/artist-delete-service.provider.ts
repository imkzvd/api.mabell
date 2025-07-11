import { Provider } from '@nestjs/common';
import { EventBus as EventBusPort } from '@core/app/common/ports/event-bus.port';
import { ArtistWriteRepository as ArtistWriteRepositoryPort } from '@core/domain/components/artist/repository/artist-write-repository.port';
import { EventBus } from '@infrastructure/event-bus';
import { ArtistWriteRepository } from '@infrastructure/mongoose/services/artist/artist-write-repository.service';
import { ArtistFileStorage as ArtistFileStoragePort } from '@core/app/common/ports/file-storages/artist-file-storage.port';
import { ArtistFileStorage } from '@infrastructure/file-storage';
import { ArtistDeleteService } from '@core/app/components/artist/services/artist-delete.service';

export const artistDeleteServiceProvider: Provider = {
  provide: ArtistDeleteService,
  useFactory: (eb: EventBusPort, wr: ArtistWriteRepositoryPort, artistFS: ArtistFileStoragePort) =>
    new ArtistDeleteService(eb, wr, artistFS),
  inject: [EventBus, ArtistWriteRepository, ArtistFileStorage],
};
