import { Module } from '@nestjs/common';
import { ArtistController } from './artist.controller';
import { CreateArtistHandler } from './commands/create-artist.handler';
import { UpdateArtistHandler } from './commands/update-artist.handler';
import { UpdateArtistAvatarHandler } from './commands/update-artist-avatar.handler';
import { UpdateArtistCoverHandler } from './commands/update-artist-cover.handler';
import { DeleteArtistAvatarHandler } from './commands/delete-artist-avatar.handler';
import { DeleteArtistCoverHandler } from './commands/delete-artist-cover.handler';
import { DeleteArtistHandler } from './commands/delete-artist.handler';
import { GetArtistHandler } from './queries/get-artist.handler';
import { ArtistService } from '@core/app/components/artist/artist.service';
import { EventBus as EventBusPort } from '@core/app/common/ports/event-bus.port';
import { ArtistWriteRepository as ArtistWriteRepositoryPort } from '@core/domain/components/artist/repository/artist-write-repository.port';
import { ArtistReadRepository as ArtistReadRepositoryPort } from '@core/domain/components/artist/repository/artist-read-repository.port';
import { IdService as IdServicePort } from '@core/app/common/ports/id.service.port';
import { TmpFileStorage as TmpFileStoragePort } from '@core/app/common/ports/file-storages/tmp-file-storage.port';
import { ArtistFileStorage as ArtistFileStoragePort } from '@core/app/common/ports/file-storages/artist-file-storage.port';
import { ArtistId } from '@core/domain/components/artist/types';
import { EventBus } from '@infrastructure/event-bus';
import { ArtistWriteRepository } from '@infrastructure/mongoose/services/artist/artist-write-repository.service';
import { ArtistReadRepository } from '@infrastructure/mongoose/services/artist/artist-read-repository.service';
import { RandomIdModule, RandomIdService } from '@infrastructure/random-id';
import { ArtistFileStorage, FileStorageModule, TmpFileStorage } from '@infrastructure/file-storage';

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
    // AlbumService,
    // TrackService,
    CreateArtistHandler,
    UpdateArtistHandler,
    UpdateArtistAvatarHandler,
    UpdateArtistCoverHandler,
    DeleteArtistAvatarHandler,
    DeleteArtistCoverHandler,
    DeleteArtistHandler,
    GetArtistHandler,
    // GetArtistAlbumsHandler,
    // GetArtistTracksHandler,
  ],
  controllers: [ArtistController],
})
export class ArtistModule {}
