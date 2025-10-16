import { Module } from '@nestjs/common';
import { ArtistCollection } from './artist.collection';
import { ArtistService } from './artist.service';

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
    ArtistService,
  ],
  exports: [ArtistCollection, ArtistService],
})
export class ArtistModule {}
