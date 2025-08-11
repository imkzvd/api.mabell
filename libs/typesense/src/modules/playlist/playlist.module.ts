import { Module } from '@nestjs/common';
import { PlaylistCollection } from './playlist.collection';

@Module({
  providers: [
    {
      provide: PlaylistCollection,
      useFactory: async () => {
        const collection = new PlaylistCollection();

        await collection.init();

        return collection;
      },
    },
  ],
  exports: [PlaylistCollection],
})
export class PlaylistModule {}
