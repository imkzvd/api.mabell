import { Global, Module } from '@nestjs/common';
import { TypesenseAdapter } from './typesense.adapter';
import { ArtistModule } from './modules/artist/artist.module';
import { AlbumModule } from './modules/album/album.module';
import { TrackModule } from './modules/track/track.module';
import { UserModule } from './modules/user/user.module';
import { ArtistService } from '../../../src/core/app/components/artist/artist.service';

@Global()
@Module({
  imports: [UserModule, ArtistModule, AlbumModule, TrackModule],
  providers: [ArtistService, TypesenseAdapter],
  exports: [TypesenseAdapter],
})
export class TypesenseModule {}
