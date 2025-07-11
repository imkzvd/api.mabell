import { Provider } from '@nestjs/common';
import { AlbumWriteRepository as AlbumWriteRepositoryPort } from '@core/domain/components/album/repository/album-write-repository.port';
import { AlbumReadRepository as AlbumReadRepositoryPort } from '@core/domain/components/album/repository/album-read-repository.port';
import { AlbumWriteRepository } from '@infrastructure/mongoose/services/album/album-write-repository.service';
import { AlbumReadRepository } from '@infrastructure/mongoose/services/album/album-read-repository.service';
import { AlbumService } from '@core/app/components/album/services/album.service';

export const albumServiceProvider: Provider = {
  provide: AlbumService,
  useFactory: (wr: AlbumWriteRepositoryPort, rr: AlbumReadRepositoryPort) =>
    new AlbumService(wr, rr),
  inject: [AlbumWriteRepository, AlbumReadRepository],
};
