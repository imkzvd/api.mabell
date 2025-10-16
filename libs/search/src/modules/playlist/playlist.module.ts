import { Module } from '@nestjs/common';
import { PlaylistCollection } from './playlist.collection';
import { PlaylistService } from './playlist.service';

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
    PlaylistService,
  ],
  exports: [PlaylistCollection, PlaylistService],
})
export class PlaylistModule {}
