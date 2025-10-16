import { Module } from '@nestjs/common';
import { AlbumCollection } from './album.collection';
import { AlbumService } from './album.service';

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
    AlbumService,
  ],
  exports: [AlbumCollection, AlbumService],
})
export class AlbumModule {}
