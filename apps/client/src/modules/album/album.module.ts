import { Module } from '@nestjs/common';
import { AlbumController } from './album.controller';
import { GetAlbumHandler } from './queries/get-album.handler';
import { GetAlbumTracksHandler } from '../track/queries/get-album-tracks.handler';
import { albumServiceProvider } from './providers/album-service.provider';
import { trackServiceProvider } from '../track/providers/track-service.provider';
import { albumVerifyServiceProvider } from './providers/album-verify-service.provider';

@Module({
  providers: [
    albumServiceProvider,
    trackServiceProvider,
    albumVerifyServiceProvider,
    GetAlbumHandler,
    GetAlbumTracksHandler,
  ],
  controllers: [AlbumController],
})
export class AlbumModule {}
