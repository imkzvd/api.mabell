import { Module } from '@nestjs/common';
import { AlbumController } from './album.controller';
import { AlbumService } from '../../../../../core/app/components/album/album.service';
import { ArtistService } from '../../../../../core/app/components/artist/artist.service';
import { CreateAlbumHandler } from '../../../../../core/app/cqrs/album/commands/create-album/create-album.handler';
import { DeleteAlbumHandler } from '../../../../../core/app/cqrs/album/commands/delete-album/delete-album.handler';
import { DeleteAlbumCoverHandler } from '../../../../../core/app/cqrs/album/commands/delete-album-cover/delete-album-cover.handler';
import { UpdateAlbumArtistsHandler } from '../../../../../core/app/cqrs/album/commands/update-album-artists/update-album-artists.handler';
import { UpdateAlbumHandler } from '../../../../../core/app/cqrs/album/commands/update-album/update-album.handler';
import { UpdateAlbumCoverHandler } from '../../../../../core/app/cqrs/album/commands/update-album-cover/update-album-cover.handler';
import { GetAlbumHandler } from '../../../../../core/app/cqrs/album/queries/get-album/get-album.handler';
import { AlbumEventSubscriber } from '../../../../../core/app/components/album/album.event-subscriber';
import { GetAlbumTracksHandler } from '../../../../../core/app/cqrs/track/queries/get-album-tracks/get-album-tracks.handler';
import { TrackService } from '../../../../../core/app/components/track/track.service';

@Module({
  providers: [
    ArtistService,
    AlbumService,
    TrackService,
    CreateAlbumHandler,
    DeleteAlbumHandler,
    DeleteAlbumCoverHandler,
    UpdateAlbumArtistsHandler,
    UpdateAlbumHandler,
    UpdateAlbumCoverHandler,
    GetAlbumHandler,
    GetAlbumTracksHandler,
    AlbumEventSubscriber,
  ],
  controllers: [AlbumController],
})
export class AlbumModule {}
