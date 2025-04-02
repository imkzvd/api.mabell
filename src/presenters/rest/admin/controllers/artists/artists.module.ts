import { Module } from '@nestjs/common';
import { ArtistsController } from './artists.controller';
import { CreateArtistHandler } from '../../../../../core/app/components/artist/commands/create-artist/create-artist.handler';
import { UpdateArtistByIdHandler } from '../../../../../core/app/components/artist/commands/update-artist-by-id/update-artist-by-id.handler';
import { UpdateArtistAvatarByIdHandler } from '../../../../../core/app/components/artist/commands/update-artist-avatar-by-id/update-artist-avatar-by-id.handler';
import { UpdateArtistCoverByIdHandler } from '../../../../../core/app/components/artist/commands/update-artist-cover-by-id/update-artist-cover-by-id.handler';
import { DeleteArtistAvatarByIdHandler } from '../../../../../core/app/components/artist/commands/delete-artist-avatar-by-id/delete-artist-avatar-by-id.handler';
import { DeleteArtistCoverByIdHandler } from '../../../../../core/app/components/artist/commands/delete-artist-cover-by-id/delete-artist-cover-by-id.handler';
import { DeleteArtistByIdHandler } from '../../../../../core/app/components/artist/commands/delete-artist-by-id/delete-artist-by-id.handler';
import { GetArtistByIdHandler } from '../../../../../core/app/components/artist/queries/get-artist-by-id/get-artist-by-id.handler';
import { GetArtistsHandler } from '../../../../../core/app/components/artist/queries/get-artists/get-artists.handler';
import { TmpFileStorageModule } from '../../../../../infrastructure/storage/tmp-fs-storage/tmp-file-storage.module';
import { ArtistFileStorageModule } from '../../../../../infrastructure/storage/artist-file-storage/artist-file-storage.module';

@Module({
  imports: [TmpFileStorageModule, ArtistFileStorageModule],
  providers: [
    CreateArtistHandler,
    UpdateArtistByIdHandler,
    UpdateArtistAvatarByIdHandler,
    UpdateArtistCoverByIdHandler,
    DeleteArtistAvatarByIdHandler,
    DeleteArtistCoverByIdHandler,
    DeleteArtistByIdHandler,
    GetArtistByIdHandler,
    GetArtistsHandler,
  ],
  controllers: [ArtistsController],
})
export class ArtistsModule {}
