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
import { FileStorageModule, TmpFileStorage, UserFileStorage } from '@infrastructure/file-storage';
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
import { trackServiceProvider } from '../track/providers/track-service.provider';
import { userServiceProvider } from '../user/providers/user-service.provider';

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
