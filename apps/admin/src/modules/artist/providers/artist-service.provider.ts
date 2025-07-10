import { Provider } from '@nestjs/common';
import { ArtistReadRepository as ArtistReadRepositoryPort } from '@core/domain/components/artist/repository/artist-read-repository.port';
import { ArtistReadRepository } from '@infrastructure/mongoose/services/artist/artist-read-repository.service';
import { ArtistService } from '@core/app/components/artist/services/artist.service';

export const artistServiceProvider: Provider = {
  provide: ArtistService,
  useFactory: (rr: ArtistReadRepositoryPort) => new ArtistService(rr),
  inject: [ArtistReadRepository],
};
