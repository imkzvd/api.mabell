import { Module } from '@nestjs/common';
import { PlaylistsController } from './playlists.controller';
import { TrackService } from '../../../../../core/app/components/track/track.service';
import { AddTrackInPlaylistHandler } from '../../../../../core/app/cqrs/playlist/commands/add-track-in-playlist/add-track-in-playlist.handler';
import { CreatePlaylistHandler } from '../../../../../core/app/cqrs/playlist/commands/create-playlist/create-playlist.handler';
import { DeletePlaylistHandler } from '../../../../../core/app/cqrs/playlist/commands/delete-playlist/delete-playlist.handler';
import { DeletePlaylistCoverHandler } from '../../../../../core/app/cqrs/playlist/commands/delete-playlist-cover/delete-playlist-cover.handler';
import { DeleteTrackFromPlaylistHandler } from '../../../../../core/app/cqrs/playlist/commands/delete-track-from-playlist/delete-track-from-playlist.handler';
import { UpdatePlaylistHandler } from '../../../../../core/app/cqrs/playlist/commands/update-playlist/update-playlist.handler';
import { UpdatePlaylistCoverHandler } from '../../../../../core/app/cqrs/playlist/commands/update-playlist-cover/update-playlist-cover.handler';
import { GetPlaylistHandler } from '../../../../../core/app/cqrs/playlist/queries/get-playlist/get-playlist.handler';
import { UserService } from '../../../../../core/app/components/user/user.service';
import { PasswordModule } from '../../../../../infrastructure/security/password/password.module';
import { PlaylistService } from '../../../../../core/app/components/playlist/playlist.service';
import { GetPlaylistTracksHandler } from '../../../../../core/app/cqrs/track/queries/get-playlist-tracks/get-playlist-tracks.handler';
import { PlaylistEventSubscriber } from '../../../../../core/app/components/playlist/playlist.event-subscriber';

@Module({
  imports: [PasswordModule],
  providers: [
    PlaylistService,
    UserService,
    TrackService,
    AddTrackInPlaylistHandler,
    CreatePlaylistHandler,
    DeletePlaylistHandler,
    DeletePlaylistCoverHandler,
    DeleteTrackFromPlaylistHandler,
    UpdatePlaylistHandler,
    UpdatePlaylistCoverHandler,
    GetPlaylistHandler,
    GetPlaylistTracksHandler,
    PlaylistEventSubscriber,
  ],
  controllers: [PlaylistsController],
})
export class PlaylistsModule {}
