import { Module } from '@nestjs/common';
import { TmpFileStorageModule } from '../../../../../infrastructure/storage/tmp-fs-storage/tmp-file-storage.module';
import { PlaylistsController } from './playlists.controller';
import { UserFileStorageModule } from '../../../../../infrastructure/storage/user-file-storage/user-file-storage.module';
import { CreatePlaylistHandler } from '../../../../../core/app/components/playlist/commands/create-playlist/create-playlist.handler';
import { AddTrackInPlaylistHandler } from '../../../../../core/app/components/playlist/commands/add-track-in-playlist/add-track-in-playlist.handler';
import { DeletePlaylistHandler } from '../../../../../core/app/components/playlist/commands/delete-playlist/delete-playlist.handler';
import { DeletePlaylistCoverHandler } from '../../../../../core/app/components/playlist/commands/delete-playlist-cover/delete-playlist-cover.handler';
import { DeleteTrackFromPlaylistHandler } from '../../../../../core/app/components/playlist/commands/delete-track-from-playlist/delete-track-from-playlist.handler';
import { UpdatePlaylistHandler } from '../../../../../core/app/components/playlist/commands/update-playlist/update-playlist.handler';
import { UpdatePlaylistCoverHandler } from '../../../../../core/app/components/playlist/commands/update-playlist-cover/update-playlist-cover.handler';
import { GetPlaylistHandler } from '../../../../../core/app/components/playlist/queries/get-playlist/get-playlist.handler';
import { GetPlaylistTracksHandler } from '../../../../../core/app/components/track/queries/get-playlist-tracks/get-playlist-tracks.handler';

@Module({
  imports: [TmpFileStorageModule, UserFileStorageModule],
  providers: [
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
  controllers: [PlaylistsController],
})
export class PlaylistsModule {}
