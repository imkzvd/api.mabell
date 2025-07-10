import { Provider } from '@nestjs/common';
import { ArtistWriteRepository as ArtistWriteRepositoryPort } from '@core/domain/components/artist/repository/artist-write-repository.port';
import { ArtistWriteRepository } from '@infrastructure/mongoose/services/artist/artist-write-repository.service';
import { ArtistVerifyService } from '@core/app/components/artist/services/artist-verify.service';

export const artistVerifyServiceProvider: Provider = {
  provide: ArtistVerifyService,
  useFactory: (wr: ArtistWriteRepositoryPort) => new ArtistVerifyService(wr),
  inject: [ArtistWriteRepository],
};
