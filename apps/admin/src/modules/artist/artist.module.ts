import { Module } from '@nestjs/common';
import { EventBus as EventBusPort } from '@core/app/common/ports/event-bus.port';
import { IdService as IdServicePort } from '@core/app/common/ports/id.service.port';
import { TmpFileStorage as TmpFileStoragePort } from '@core/app/common/ports/file-storages/tmp-file-storage.port';
import { ArtistFileStorage as ArtistFileStoragePort } from '@core/app/common/ports/file-storages/artist-file-storage.port';
import { EventBus } from '@infrastructure/event-bus';
import { RandomIdModule, RandomIdService } from '@infrastructure/random-id';
import { ArtistFileStorage, FileStorageModule, TmpFileStorage } from '@infrastructure/file-storage';
import { AlbumService } from '@core/app/components/album/album.service';
import { AlbumWriteRepository as AlbumWriteRepositoryPort } from '@core/domain/components/album/repository/album-write-repository.port';
import { AlbumReadRepository as AlbumReadRepositoryPort } from '@core/domain/components/album/repository/album-read-repository.port';
import { AlbumId } from '@core/domain/components/album/types';
import { AlbumWriteRepository } from '@infrastructure/mongoose/services/album/album-write-repository.service';
import { AlbumReadRepository } from '@infrastructure/mongoose/services/album/album-read-repository.service';
import { TrackService } from '@core/app/components/track/track.service';
import { TrackWriteRepository as TrackWriteRepositoryPort } from '@core/domain/components/track/repository/track-write-repository.port';
import { TrackReadRepository as TrackReadRepositoryPort } from '@core/domain/components/track/repository/track-read-repository.port';
import { TrackId } from '@core/domain/components/track/types';
import { TrackWriteRepository } from '@infrastructure/mongoose/services/track/track-write-repository.service';
import { TrackReadRepository } from '@infrastructure/mongoose/services/track/track-read-repository.service';
import { ArtistController } from './artist.controller';
import { CreateArtistHandler } from './commands/create-artist.handler';
import { UpdateArtistHandler } from './commands/update-artist.handler';
import { UpdateArtistAvatarHandler } from './commands/update-artist-avatar.handler';
import { UpdateArtistCoverHandler } from './commands/update-artist-cover.handler';
import { DeleteArtistAvatarHandler } from './commands/delete-artist-avatar.handler';
import { DeleteArtistCoverHandler } from './commands/delete-artist-cover.handler';
import { GetArtistTracksHandler } from '../track/queries/get-artist-tracks.handler';
import { DeleteArtistHandler } from './commands/delete-artist.handler';
import { GetArtistHandler } from './queries/get-artist.handler';
import { GetArtistAlbumsHandler } from '../album/queries/get-artist-albums.handler';
import { artistServiceProvider } from './providers/artist-service.provider';

@Module({
  imports: [RandomIdModule, FileStorageModule],
  providers: [
    artistServiceProvider,
    {
      provide: AlbumService,
      useFactory: (
        eb: EventBusPort,
        wr: AlbumWriteRepositoryPort,
        rr: AlbumReadRepositoryPort,
        idService: IdServicePort<AlbumId>,
        tmpFS: TmpFileStoragePort,
        artistFS: ArtistFileStoragePort,
      ) => new AlbumService(eb, wr, rr, idService, tmpFS, artistFS),
      inject: [
        EventBus,
        AlbumWriteRepository,
        AlbumReadRepository,
        RandomIdService,
        TmpFileStorage,
        ArtistFileStorage,
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
    CreateArtistHandler,
    UpdateArtistHandler,
    UpdateArtistAvatarHandler,
    UpdateArtistCoverHandler,
    DeleteArtistAvatarHandler,
    DeleteArtistCoverHandler,
    DeleteArtistHandler,
    GetArtistHandler,
    GetArtistAlbumsHandler,
    GetArtistTracksHandler,
  ],
  controllers: [ArtistController],
})
export class ArtistModule {}
