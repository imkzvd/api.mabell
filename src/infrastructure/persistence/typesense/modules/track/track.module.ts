import { Module } from '@nestjs/common';
import { TrackEventSubscriber } from './track.event-subscriber';
import { TrackCollection } from './track.collection';

@Module({
  providers: [TrackEventSubscriber, TrackCollection],
  exports: [TrackCollection],
})
export class TrackModule {}
