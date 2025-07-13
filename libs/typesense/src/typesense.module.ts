import { Module } from '@nestjs/common';
import { TypesenseEventSubscriber } from '@infrastructure/typesense/events/typesense.event-subscriber';
import { UserModule } from '@infrastructure/typesense/modules/user/user.module';
import { ArtistModule } from '@infrastructure/typesense/modules/artist/artist.module';
import { AlbumModule } from '@infrastructure/typesense/modules/album/album.module';
import { TrackModule } from '@infrastructure/typesense/modules/track/track.module';
import { TypesenseService } from '@infrastructure/typesense/typesense.service';

@Module({
  imports: [UserModule, ArtistModule, AlbumModule, TrackModule],
  providers: [TypesenseService, TypesenseEventSubscriber],
  exports: [TypesenseService],
})
export class TypesenseModule {}
