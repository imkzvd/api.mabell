import { Module } from '@nestjs/common';
import { AlbumController } from './album.controller';
import { CreateAlbumHandler } from './commands/create-album.handler';
import { DeleteAlbumHandler } from './commands/delete-album.handler';
import { DeleteAlbumCoverHandler } from './commands/delete-album-cover.handler';
import { UpdateAlbumArtistsHandler } from './commands/update-album-artists.handler';
import { UpdateAlbumHandler } from './commands/update-album.handler';
import { UpdateAlbumCoverHandler } from './commands/update-album-cover.handler';
import { GetAlbumHandler } from './queries/get-album.handler';
import { AlbumService } from '@core/app/components/album/album.service';
import { EventBus as EventBusPort } from '@core/app/common/ports/event-bus.port';
import { AlbumWriteRepository as AlbumWriteRepositoryPort } from '@core/domain/components/album/repository/album-write-repository.port';
import { AlbumReadRepository as AlbumReadRepositoryPort } from '@core/domain/components/album/repository/album-read-repository.port';
import { IdService as IdServicePort } from '@core/app/common/ports/id.service.port';
import { TmpFileStorage as TmpFileStoragePort } from '@core/app/common/ports/file-storages/tmp-file-storage.port';
import { ArtistFileStorage as ArtistFileStoragePort } from '@core/app/common/ports/file-storages/artist-file-storage.port';
import { AlbumId } from '@core/domain/components/album/types';
import { EventBus } from '@infrastructure/event-bus';
import { AlbumWriteRepository } from '@infrastructure/mongoose/services/album/album-write-repository.service';
import { AlbumReadRepository } from '@infrastructure/mongoose/services/album/album-read-repository.service';
import { RandomIdModule, RandomIdService } from '@infrastructure/random-id';
import { ArtistFileStorage, FileStorageModule, TmpFileStorage } from '@infrastructure/file-storage';
import { ArtistService } from '@core/app/components/artist/artist.service';
import { ArtistWriteRepository as ArtistWriteRepositoryPort } from '@core/domain/components/artist/repository/artist-write-repository.port';
import { ArtistReadRepository as ArtistReadRepositoryPort } from '@core/domain/components/artist/repository/artist-read-repository.port';
import { ArtistId } from '@core/domain/components/artist/types';
import { ArtistWriteRepository } from '@infrastructure/mongoose/services/artist/artist-write-repository.service';
import { ArtistReadRepository } from '@infrastructure/mongoose/services/artist/artist-read-repository.service';

@Module({
  imports: [RandomIdModule, FileStorageModule],
  providers: [
    {
      provide: ArtistService,
      useFactory: (
        eb: EventBusPort,
        wr: ArtistWriteRepositoryPort,
        rr: ArtistReadRepositoryPort,
        idService: IdServicePort<ArtistId>,
        tmpFS: TmpFileStoragePort,
        artistFS: ArtistFileStoragePort,
      ) => new ArtistService(eb, wr, rr, idService, tmpFS, artistFS),
      inject: [
        EventBus,
        ArtistWriteRepository,
        ArtistReadRepository,
        RandomIdService,
        TmpFileStorage,
        ArtistFileStorage,
      ],
    },
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
    // TrackService,
    CreateAlbumHandler,
    DeleteAlbumHandler,
    DeleteAlbumCoverHandler,
    UpdateAlbumArtistsHandler,
    UpdateAlbumHandler,
    UpdateAlbumCoverHandler,
    GetAlbumHandler,
    // GetAlbumTracksHandler,
    // AlbumEventSubscriber,
  ],
  controllers: [AlbumController],
})
export class AlbumModule {}
