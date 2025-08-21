import { Module } from '@nestjs/common';
import { AlbumCollection } from './album.collection';

@Module({
  providers: [
    {
      provide: AlbumCollection,
      useFactory: async () => {
        const collection = new AlbumCollection();

        await collection.init();

        return collection;
      },
    },
  ],
  exports: [AlbumCollection],
})
export class AlbumModule {}
