import { Global, Module } from '@nestjs/common';
import { InMemoryEventBusAdapter } from './in-memory-event-bus.adapter';
import { EVENT_BUS_DI_TOKEN } from '../../../core/app/common/ports/event-bus.port';

@Global()
@Module({
  providers: [
    {
      provide: EVENT_BUS_DI_TOKEN,
      useClass: InMemoryEventBusAdapter,
    },
  ],
  exports: [
    {
      provide: EVENT_BUS_DI_TOKEN,
      useClass: InMemoryEventBusAdapter,
    },
  ],
})
export class InMemoryEventBusModule {}
