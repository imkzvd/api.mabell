import { Module } from '@nestjs/common';
import { SearchEventSubscriber } from './events/search.event-subscriber';
import { SearchService } from './search.service';
import { UserModule } from './modules/user/user.module';
import { ArtistModule } from './modules/artist/artist.module';
import { AlbumModule } from './modules/album/album.module';
import { TrackModule } from './modules/track/track.module';
import { PlaylistModule } from './modules/playlist/playlist.module';

@Module({
  imports: [UserModule, ArtistModule, AlbumModule, TrackModule, PlaylistModule],
  providers: [SearchService, SearchEventSubscriber],
  exports: [SearchService],
})
export class SearchModule {}
