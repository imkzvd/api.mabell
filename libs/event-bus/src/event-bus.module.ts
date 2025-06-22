import { Global, Module } from '@nestjs/common';
import { EventBusService } from './event-bus.service';
import { EVENT_BUS_DI_TOKEN } from '../../../core/app/common/ports/event-bus.port';

@Global()
@Module({
  providers: [
    {
      provide: EVENT_BUS_DI_TOKEN,
      useClass: EventBusService,
    },
  ],
  exports: [
    {
      provide: EVENT_BUS_DI_TOKEN,
      useClass: EventBusService,
    },
  ],
})
export class EventBusModule {}
