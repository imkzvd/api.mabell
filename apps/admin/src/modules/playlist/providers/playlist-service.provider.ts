import { Provider } from '@nestjs/common';
import { PlaylistReadRepository as PlaylistReadRepositoryPort } from '@core/domain/components/playlist/repository/playlist-read-repository.port';
import { PlaylistReadRepository } from '@infrastructure/mongoose/services/playlist/playlist-read-repository.service';
import { PlaylistService } from '@core/app/components/playlist/services/playlist.service';

export const playlistServiceProvider: Provider = {
  provide: PlaylistService,
  useFactory: (rr: PlaylistReadRepositoryPort) => new PlaylistService(rr),
  inject: [PlaylistReadRepository],
};
