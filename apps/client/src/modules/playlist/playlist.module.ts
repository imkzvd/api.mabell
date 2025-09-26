import { Module } from '@nestjs/common';
import { PlaylistController } from './playlist.controller';
import { GetPlaylistHandler } from './queries/get-playlist.handler';
import { playlistServiceProvider } from './providers/playlist-service.provider';
import { trackServiceProvider } from '../track/providers/track-service.provider';
import { GetPlaylistTracksHandler } from '../track/queries/get-playlist-tracks.handler';

@Module({
  providers: [
    playlistServiceProvider,
    trackServiceProvider,
    GetPlaylistHandler,
    GetPlaylistTracksHandler,
  ],
  controllers: [PlaylistController],
})
export class PlaylistModule {}
