import { Module } from '@nestjs/common';
import { UserCollection } from './user.collection';

@Module({
  providers: [
    {
      provide: UserCollection,
      useFactory: async () => {
        const collection = new UserCollection();

        await collection.init();

        return collection;
      },
    },
  ],
  exports: [UserCollection],
})
export class UserModule {}
