import { Module } from '@nestjs/common';
import { UserCollection } from './user.collection';
import { UserEventSubscriber } from './user.event-subscriber';
import { EventBusModule } from '@infrastructure/event-bus';

@Module({
  imports: [EventBusModule],
  providers: [UserEventSubscriber, UserCollection],
  exports: [UserCollection],
})
export class UserModule {}
