import { Module } from '@nestjs/common';
import { AlbumEventSubscriber } from './album.event-subscriber';
import { AlbumCollection } from './album.collection';

@Module({
  providers: [AlbumEventSubscriber, AlbumCollection],
  exports: [AlbumCollection],
})
export class AlbumModule {}
