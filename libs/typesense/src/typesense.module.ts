import { Global, Module } from '@nestjs/common';
import { TypesenseAdapter } from './typesense.adapter';
import { ArtistModule } from './modules/artist/artist.module';
import { SEARCH_SERVICE_DI_TOKEN } from '../../../core/app/components/search/ports/search-service/search-service.port';
import { AlbumModule } from './modules/album/album.module';
import { TrackModule } from './modules/track/track.module';
import { ArtistService } from '../../../core/app/components/artist/artist.service';
import { UserModule } from './modules/user/user.module';

@Global()
@Module({
  imports: [UserModule, ArtistModule, AlbumModule, TrackModule],
  providers: [
    ArtistService,
    {
      provide: SEARCH_SERVICE_DI_TOKEN,
      useClass: TypesenseAdapter,
    },
  ],
  exports: [
    {
      provide: SEARCH_SERVICE_DI_TOKEN,
      useClass: TypesenseAdapter,
    },
  ],
})
export class TypesenseModule {}
