import { Global, Module } from '@nestjs/common';
import { QueryBus } from './query-bus.service';

@Global()
@Module({
  providers: [QueryBus],
  exports: [QueryBus],
})
export class QueryBusModule {}
