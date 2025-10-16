import { Module } from '@nestjs/common';
import { PopularController } from './popular.controller';
import { GetArtistsByGenresHandler } from './queries/get-artists-by-genres.handler';
import { artistServiceProvider } from '../artist/providers/artist-service.provider';
import { GetAlbumsByGenresHandler } from './queries/get-albums-by-genres.handler';
import { albumServiceProvider } from '../album/providers/album-service.provider';

@Module({
  imports: [],
  providers: [
    artistServiceProvider,
    albumServiceProvider,
    GetArtistsByGenresHandler,
    GetAlbumsByGenresHandler,
  ],
  controllers: [PopularController],
})
export class PopularModule {}
