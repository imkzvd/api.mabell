import { Module } from '@nestjs/common';
import { TrackCollection } from './track.collection';
import { TrackService } from './track.service';

@Module({
  providers: [
    {
      provide: TrackCollection,
      useFactory: async () => {
        const collection = new TrackCollection();

        await collection.init();

        return collection;
      },
    },
    TrackService,
  ],
  exports: [TrackCollection, TrackService],
})
export class TrackModule {}
