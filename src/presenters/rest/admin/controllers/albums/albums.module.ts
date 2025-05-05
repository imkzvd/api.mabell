import { Module } from '@nestjs/common';
import { TmpFileStorageModule } from '../../../../../infrastructure/storage/tmp-fs-storage/tmp-file-storage.module';
import { ArtistFileStorageModule } from '../../../../../infrastructure/storage/artist-file-storage/artist-file-storage.module';
import { AlbumsController } from './albums.controller';
import { CreateAlbumHandler } from '../../../../../core/app/components/album/commands/create-album/create-album.handler';
import { DeleteAlbumHandler } from '../../../../../core/app/components/album/commands/delete-album/delete-album.handler';
import { DeleteAlbumCoverHandler } from '../../../../../core/app/components/album/commands/delete-album-cover/delete-album-cover.handler';
import { UpdateAlbumArtistsHandler } from '../../../../../core/app/components/album/commands/update-album-artists/update-album-artists.handler';
import { UpdateAlbumHandler } from '../../../../../core/app/components/album/commands/update-album/update-album.handler';
import { UpdateAlbumCoverHandler } from '../../../../../core/app/components/album/commands/update-album-cover/update-album-cover.handler';
import { GetAlbumHandler } from '../../../../../core/app/components/album/queries/get-album/get-album.handler';
import { GetAlbumTracksHandler } from '../../../../../core/app/components/track/queries/get-album-tracks/get-album-tracks.handler';

@Module({
  imports: [TmpFileStorageModule, ArtistFileStorageModule],
  providers: [
    CreateAlbumHandler,
    DeleteAlbumHandler,
    DeleteAlbumCoverHandler,
    UpdateAlbumArtistsHandler,
    UpdateAlbumHandler,
    UpdateAlbumCoverHandler,
    GetAlbumHandler,
    GetAlbumTracksHandler,
  ],
  controllers: [AlbumsController],
})
export class AlbumsModule {}
