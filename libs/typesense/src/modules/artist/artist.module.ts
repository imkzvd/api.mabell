import { Module } from '@nestjs/common';
import { ArtistCollection } from './artist.collection';

@Module({
  providers: [
    {
      provide: ArtistCollection,
      useFactory: async () => {
        const collection = new ArtistCollection();

        await collection.init();

        return collection;
      },
    },
  ],
  exports: [ArtistCollection],
})
export class ArtistModule {}
