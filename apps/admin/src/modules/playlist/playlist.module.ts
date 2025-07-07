import { Module } from '@nestjs/common';
import { RandomIdModule } from '@infrastructure/random-id';
import { FileStorageModule } from '@infrastructure/file-storage';
import { PasswordModule } from '@infrastructure/password';
import { PlaylistController } from './playlist.controller';
import { AddTrackInPlaylistHandler } from './commands/add-track-in-playlist.handler';
import { CreatePlaylistHandler } from './commands/create-playlist.handler';
import { DeletePlaylistHandler } from './commands/delete-playlist.handler';
import { DeletePlaylistCoverHandler } from './commands/delete-playlist-cover.handler';
import { DeleteTrackFromPlaylistHandler } from './commands/delete-track-from-playlist.handler';
import { UpdatePlaylistHandler } from './commands/update-playlist.handler';
import { UpdatePlaylistCoverHandler } from './commands/update-playlist-cover.handler';
import { GetPlaylistHandler } from './queries/get-playlist.handler';
import { GetPlaylistTracksHandler } from '../track/queries/get-playlist-tracks.handler';
import { trackServiceProvider } from '../../providers/track-service.provider';
import { userServiceProvider } from '../../providers/user-service.provider';
import { playlistServiceProvider } from '../../providers/playlist-service.provider';

@Module({
  imports: [RandomIdModule, PasswordModule, FileStorageModule],
  providers: [
    playlistServiceProvider,
    trackServiceProvider,
    userServiceProvider,
    AddTrackInPlaylistHandler,
    CreatePlaylistHandler,
    DeletePlaylistHandler,
    DeletePlaylistCoverHandler,
    DeleteTrackFromPlaylistHandler,
    UpdatePlaylistHandler,
    UpdatePlaylistCoverHandler,
    GetPlaylistHandler,
    GetPlaylistTracksHandler,
  ],
  controllers: [PlaylistController],
})
export class PlaylistModule {}
