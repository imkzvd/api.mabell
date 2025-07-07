import { Module } from '@nestjs/common';
import { EventBus as EventBusPort } from '@core/app/common/ports/event-bus.port';
import { IdService as IdServicePort } from '@core/app/common/ports/id.service.port';
import { TmpFileStorage as TmpFileStoragePort } from '@core/app/common/ports/file-storages/tmp-file-storage.port';
import { ArtistFileStorage as ArtistFileStoragePort } from '@core/app/common/ports/file-storages/artist-file-storage.port';
import { EventBus } from '@infrastructure/event-bus';
import { RandomIdModule, RandomIdService } from '@infrastructure/random-id';
import { ArtistFileStorage, FileStorageModule, TmpFileStorage } from '@infrastructure/file-storage';
import { TrackService } from '@core/app/components/track/track.service';
import { TrackWriteRepository as TrackWriteRepositoryPort } from '@core/domain/components/track/repository/track-write-repository.port';
import { TrackReadRepository as TrackReadRepositoryPort } from '@core/domain/components/track/repository/track-read-repository.port';
import { TrackId } from '@core/domain/components/track/types';
import { TrackWriteRepository } from '@infrastructure/mongoose/services/track/track-write-repository.service';
import { TrackReadRepository } from '@infrastructure/mongoose/services/track/track-read-repository.service';
import { AlbumController } from './album.controller';
import { CreateAlbumHandler } from './commands/create-album.handler';
import { DeleteAlbumHandler } from './commands/delete-album.handler';
import { DeleteAlbumCoverHandler } from './commands/delete-album-cover.handler';
import { UpdateAlbumArtistsHandler } from './commands/update-album-artists.handler';
import { UpdateAlbumHandler } from './commands/update-album.handler';
import { UpdateAlbumCoverHandler } from './commands/update-album-cover.handler';
import { GetAlbumHandler } from './queries/get-album.handler';
import { GetAlbumTracksHandler } from '../track/queries/get-album-tracks.handler';
import { artistServiceProvider } from '../artist/providers/artist-service.provider';
import { albumServiceProvider } from './providers/album-service.provider';

@Module({
  imports: [RandomIdModule, FileStorageModule],
  providers: [
    artistServiceProvider,
    albumServiceProvider,
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
    CreateAlbumHandler,
    DeleteAlbumHandler,
    DeleteAlbumCoverHandler,
    UpdateAlbumArtistsHandler,
    UpdateAlbumHandler,
    UpdateAlbumCoverHandler,
    GetAlbumHandler,
    GetAlbumTracksHandler,
    // AlbumEventSubscriber,
  ],
  controllers: [AlbumController],
})
export class AlbumModule {}
