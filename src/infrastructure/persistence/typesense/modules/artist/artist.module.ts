import { Module } from '@nestjs/common';
import { ArtistEventSubscriber } from './artist.event-subscriber';
import { ArtistCollection } from './artist.collection';

@Module({
  providers: [ArtistEventSubscriber, ArtistCollection],
  exports: [ArtistCollection],
})
export class ArtistModule {}
