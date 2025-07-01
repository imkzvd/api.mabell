import { Module } from '@nestjs/common';
import { TrackService } from '@core/app/components/track/track.service';
import { EventBus as EventBusPort } from '@core/app/common/ports/event-bus.port';
import { TrackWriteRepository as TrackWriteRepositoryPort } from '@core/domain/components/track/repository/track-write-repository.port';
import { TrackReadRepository as TrackReadRepositoryPort } from '@core/domain/components/track/repository/track-read-repository.port';
import { IdService as IdServicePort } from '@core/app/common/ports/id.service.port';
import { TmpFileStorage as TmpFileStoragePort } from '@core/app/common/ports/file-storages/tmp-file-storage.port';
import { ArtistFileStorage as ArtistFileStoragePort } from '@core/app/common/ports/file-storages/artist-file-storage.port';
import { TrackId } from '@core/domain/components/track/types';
import { EventBus } from '@infrastructure/event-bus';
import { TrackWriteRepository } from '@infrastructure/mongoose/services/track/track-write-repository.service';
import { TrackReadRepository } from '@infrastructure/mongoose/services/track/track-read-repository.service';
import { RandomIdModule, RandomIdService } from '@infrastructure/random-id';
import { ArtistFileStorage, FileStorageModule, TmpFileStorage } from '@infrastructure/file-storage';
import { AlbumService } from '@core/app/components/album/album.service';
import { AlbumWriteRepository as AlbumWriteRepositoryPort } from '@core/domain/components/album/repository/album-write-repository.port';
import { AlbumReadRepository as AlbumReadRepositoryPort } from '@core/domain/components/album/repository/album-read-repository.port';
import { AlbumId } from '@core/domain/components/album/types';
import { AlbumWriteRepository } from '@infrastructure/mongoose/services/album/album-write-repository.service';
import { AlbumReadRepository } from '@infrastructure/mongoose/services/album/album-read-repository.service';
import { ArtistService } from '@core/app/components/artist/artist.service';
import { ArtistWriteRepository as ArtistWriteRepositoryPort } from '@core/domain/components/artist/repository/artist-write-repository.port';
import { ArtistReadRepository as ArtistReadRepositoryPort } from '@core/domain/components/artist/repository/artist-read-repository.port';
import { ArtistId } from '@core/domain/components/artist/types';
import { ArtistWriteRepository } from '@infrastructure/mongoose/services/artist/artist-write-repository.service';
import { ArtistReadRepository } from '@infrastructure/mongoose/services/artist/artist-read-repository.service';
import { TrackController } from './track.controller';
import { CreateTrackHandler } from './commands/create-track.handler';
import { DeleteTrackHandler } from './commands/delete-track.handler';
import { DeleteTrackFileHandler } from './commands/delete-track-file.handler';
import { UpdateTrackHandler } from './commands/update-track.handler';
import { UpdateTrackFeatArtistsHandler } from './commands/update-track-feat-artists.handler';
import { UpdateTrackFileHandler } from './commands/update-track-file.handler';
import { GetTrackHandler } from './queries/get-track.handler';

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
    CreateTrackHandler,
    DeleteTrackHandler,
    DeleteTrackFileHandler,
    UpdateTrackHandler,
    UpdateTrackFeatArtistsHandler,
    UpdateTrackFileHandler,
    GetTrackHandler,
  ],
  controllers: [TrackController],
})
export class TrackModule {}
