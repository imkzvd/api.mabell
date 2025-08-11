import { Module } from '@nestjs/common';
import { TypesenseEventSubscriber } from './events/typesense.event-subscriber';
import { TypesenseService } from './typesense.service';
import { UserModule } from './modules/user/user.module';
import { ArtistModule } from './modules/artist/artist.module';
import { AlbumModule } from './modules/album/album.module';
import { TrackModule } from './modules/track/track.module';
import { PlaylistModule } from './modules/playlist/playlist.module';

@Module({
  imports: [UserModule, ArtistModule, AlbumModule, TrackModule, PlaylistModule],
  providers: [TypesenseService, TypesenseEventSubscriber],
  exports: [TypesenseService],
})
export class TypesenseModule {}
