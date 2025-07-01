import { Global, Module } from '@nestjs/common';
import { ArtistService } from '@core/app/components/artist/artist.service';
import { TypesenseService } from './typesense.service';
import { ArtistModule } from './modules/artist/artist.module';
import { AlbumModule } from './modules/album/album.module';
import { TrackModule } from './modules/track/track.module';
import { UserModule } from './modules/user/user.module';
import { EventBusModule } from '@infrastructure/event-bus';

@Global()
@Module({
  imports: [UserModule, ArtistModule, AlbumModule, TrackModule, EventBusModule],
  providers: [ArtistService, TypesenseService],
  exports: [TypesenseService],
})
export class TypesenseModule {}
