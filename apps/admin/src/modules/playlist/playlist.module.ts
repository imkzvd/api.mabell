import { Module } from '@nestjs/common';
import { PlaylistService } from '@core/app/components/playlist/playlist.service';
import { EventBus as EventBusPort } from '@core/app/common/ports/event-bus.port';
import { PlaylistWriteRepository as PlaylistWriteRepositoryPort } from '@core/domain/components/playlist/repository/playlist-write-repository.port';
import { PlaylistReadRepository as PlaylistReadRepositoryPort } from '@core/domain/components/playlist/repository/playlist-read-repository.port';
import { IdService as IdServicePort } from '@core/app/common/ports/id.service.port';
import { TmpFileStorage as TmpFileStoragePort } from '@core/app/common/ports/file-storages/tmp-file-storage.port';
import { UserFileStorage as UserFileStoragePort } from '@core/app/common/ports/file-storages/user-file-storage.port';
import { PlaylistId } from '@core/domain/components/playlist/types';
import { EventBus } from '@infrastructure/event-bus';
import { PlaylistWriteRepository } from '@infrastructure/mongoose/services/playlist/playlist-write-repository.service';
import { PlaylistReadRepository } from '@infrastructure/mongoose/services/playlist/playlist-read-repository.service';
import { RandomIdModule, RandomIdService } from '@infrastructure/random-id';
import {
  ArtistFileStorage,
  FileStorageModule,
  TmpFileStorage,
  UserFileStorage,
} from '@infrastructure/file-storage';
import { TrackService } from '@core/app/components/track/track.service';
import { TrackWriteRepository as TrackWriteRepositoryPort } from '@core/domain/components/track/repository/track-write-repository.port';
import { TrackReadRepository as TrackReadRepositoryPort } from '@core/domain/components/track/repository/track-read-repository.port';
import { TrackId } from '@core/domain/components/track/types';
import { ArtistFileStorage as ArtistFileStoragePort } from '@core/app/common/ports/file-storages/artist-file-storage.port';
import { TrackWriteRepository } from '@infrastructure/mongoose/services/track/track-write-repository.service';
import { TrackReadRepository } from '@infrastructure/mongoose/services/track/track-read-repository.service';
import { UserService } from '@core/app/components/user/user.service';
import { UserWriteRepository as UserWriteRepositoryPort } from '@core/domain/components/user/repository/user-write-repository.port';
import { UserReadRepository as UserReadRepositoryPort } from '@core/domain/components/user/repository/user-read-repository.port';
import { UserId } from '@core/domain/components/user/types';
import { PasswordService as PasswordServicePort } from '@core/app/common/ports/password-service.port';
import { UserWriteRepository } from '@infrastructure/mongoose/services/user/user-write-repository.service';
import { UserReadRepository } from '@infrastructure/mongoose/services/user/user-read-repository.service';
import { PasswordModule, PasswordService } from '@infrastructure/password';
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

@Module({
  imports: [RandomIdModule, PasswordModule, FileStorageModule],
  providers: [
    {
      provide: PlaylistService,
      useFactory: (
        eb: EventBusPort,
        wr: PlaylistWriteRepositoryPort,
        rr: PlaylistReadRepositoryPort,
        idService: IdServicePort<PlaylistId>,
        tmpFS: TmpFileStoragePort,
        userFS: UserFileStoragePort,
      ) => new PlaylistService(eb, wr, rr, idService, tmpFS, userFS),
      inject: [
        EventBus,
        PlaylistWriteRepository,
        PlaylistReadRepository,
        RandomIdService,
        TmpFileStorage,
        UserFileStorage,
      ],
    },
    {
      provide: TrackService,
      useFactory: (
        eb: EventBusPort,
        wr: TrackWriteRepositoryPort,
        rr: TrackReadRepositoryPort,
        idService: IdServicePort<TrackId>,
        tmpFS: TmpFileStoragePort,
        artistFS: ArtistFileStoragePort,
      ) => new TrackService(eb, wr, rr, idService, tmpFS, artistFS),
      inject: [
        EventBus,
        TrackWriteRepository,
        TrackReadRepository,
        RandomIdService,
        TmpFileStorage,
        ArtistFileStorage,
      ],
    },
    {
      provide: UserService,
      useFactory: (
        eb: EventBusPort,
        wr: UserWriteRepositoryPort,
        rr: UserReadRepositoryPort,
        idService: IdServicePort<UserId>,
        passwordService: PasswordServicePort,
        tmpFS: TmpFileStoragePort,
        userFS: UserFileStoragePort,
      ) => new UserService(eb, wr, rr, idService, passwordService, tmpFS, userFS),
      inject: [
        EventBus,
        UserWriteRepository,
        UserReadRepository,
        RandomIdService,
        PasswordService,
        TmpFileStorage,
        UserFileStorage,
      ],
    },
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
