import { Module } from '@nestjs/common';
import { ArtistsController } from './artists.controller';
import { CreateArtistHandler } from '../../../../../core/app/components/artist/commands/create-artist/create-artist.handler';
import { UpdateArtistHandler } from '../../../../../core/app/components/artist/commands/update-artist/update-artist.handler';
import { UpdateArtistAvatarHandler } from '../../../../../core/app/components/artist/commands/update-artist-avatar/update-artist-avatar.handler';
import { UpdateArtistCoverHandler } from '../../../../../core/app/components/artist/commands/update-artist-cover/update-artist-cover.handler';
import { DeleteArtistAvatarHandler } from '../../../../../core/app/components/artist/commands/delete-artist-avatar/delete-artist-avatar.handler';
import { DeleteArtistCoverHandler } from '../../../../../core/app/components/artist/commands/delete-artist-cover/delete-artist-cover.handler';
import { DeleteArtistHandler } from '../../../../../core/app/components/artist/commands/delete-artist/delete-artist.handler';
import { GetArtistHandler } from '../../../../../core/app/components/artist/queries/get-artist/get-artist.handler';
import { TmpFileStorageModule } from '../../../../../infrastructure/storage/tmp-fs-storage/tmp-file-storage.module';
import { ArtistFileStorageModule } from '../../../../../infrastructure/storage/artist-file-storage/artist-file-storage.module';
import { GetArtistAlbumsHandler } from '../../../../../core/app/components/album/queries/get-artist-albums/get-artist-albums.handler';
import { GetArtistTracksHandler } from '../../../../../core/app/components/track/queries/get-artist-tracks/get-artist-tracks.handler';

@Module({
  imports: [TmpFileStorageModule, ArtistFileStorageModule],
  providers: [
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
  controllers: [ArtistsController],
})
export class ArtistsModule {}
