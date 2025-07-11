import { Provider } from '@nestjs/common';
import { AlbumWriteRepository as AlbumWriteRepositoryPort } from '@core/domain/components/album/repository/album-write-repository.port';
import { EventBus as EventBusPort } from '@core/app/common/ports/event-bus.port';
import { AlbumWriteRepository } from '@infrastructure/mongoose/services/album/album-write-repository.service';
import { EventBus } from '@infrastructure/event-bus';
import { AlbumDeleteService } from '@core/app/components/album/services/album-delete.service';

export const albumDeleteServiceProvider: Provider = {
  provide: AlbumDeleteService,
  useFactory: (eb: EventBusPort, wr: AlbumWriteRepositoryPort) => new AlbumDeleteService(eb, wr),
  inject: [EventBus, AlbumWriteRepository],
};
