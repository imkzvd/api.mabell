import { Module } from '@nestjs/common';
import { TrackCollection } from './track.collection';

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
  ],
  exports: [TrackCollection],
})
export class TrackModule {}
