import { Module } from '@nestjs/common';
import { TmpFileStorageModule } from '../../../../../infrastructure/storage/tmp-fs-storage/tmp-file-storage.module';
import { ArtistFileStorageModule } from '../../../../../infrastructure/storage/artist-file-storage/artist-file-storage.module';
import { AlbumsController } from './albums.controller';
import { CreateAlbumHandler } from '../../../../../core/app/components/album/commands/create-album/create-album.handler';
import { DeleteAlbumByIdHandler } from '../../../../../core/app/components/album/commands/delete-album-by-id/delete-album-by-id.handler';
import { DeleteAlbumCoverByIdHandler } from '../../../../../core/app/components/album/commands/delete-album-cover-by-id/delete-album-cover-by-id.handler';
import { UpdateAlbumArtistsByIdHandler } from '../../../../../core/app/components/album/commands/update-album-artists-by-id/update-album-artists-by-id.handler';
import { UpdateAlbumByIdHandler } from '../../../../../core/app/components/album/commands/update-album-by-id/update-album-by-id.handler';
import { UpdateAlbumCoverByIdHandler } from '../../../../../core/app/components/album/commands/update-album-cover-by-id/update-album-cover-by-id.handler';
import { GetAlbumByIdHandler } from '../../../../../core/app/components/album/queries/get-album-by-id/get-album-by-id.handler';
import { GetAlbumTracksHandler } from '../../../../../core/app/components/track/queries/get-album-tracks/get-album-tracks.handler';

@Module({
  imports: [TmpFileStorageModule, ArtistFileStorageModule],
  providers: [
    CreateAlbumHandler,
    DeleteAlbumByIdHandler,
    DeleteAlbumCoverByIdHandler,
    UpdateAlbumArtistsByIdHandler,
    UpdateAlbumByIdHandler,
    UpdateAlbumCoverByIdHandler,
    GetAlbumByIdHandler,
    GetAlbumTracksHandler,
  ],
  controllers: [AlbumsController],
})
export class AlbumsModule {}
