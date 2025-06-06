import { Module } from '@nestjs/common';
import { UserCollection } from './user.collection';
import { UserEventSubscriber } from './user.event-subscriber';

@Module({
  providers: [UserEventSubscriber, UserCollection],
  exports: [UserCollection],
})
export class UserModule {}
