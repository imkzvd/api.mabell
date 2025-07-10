import { Provider } from '@nestjs/common';
import { AlbumWriteRepository as AlbumWriteRepositoryPort } from '@core/domain/components/album/repository/album-write-repository.port';
import { AlbumWriteRepository } from '@infrastructure/mongoose/services/album/album-write-repository.service';
import { AlbumVerifyService } from '@core/app/components/album/services/album-verify.service';

export const albumVerifyServiceProvider: Provider = {
  provide: AlbumVerifyService,
  useFactory: (wr: AlbumWriteRepositoryPort) => new AlbumVerifyService(wr),
  inject: [AlbumWriteRepository],
};
