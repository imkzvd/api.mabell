import { Module } from '@nestjs/common';
import { UserCollection } from './user.collection';
import { UserService } from './user.service';

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
    UserService,
  ],
  exports: [UserCollection, UserService],
})
export class UserModule {}
