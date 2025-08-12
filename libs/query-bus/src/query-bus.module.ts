import { Global, Module } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';
import { QueryBus } from './query-bus.service';

@Global()
@Module({
  imports: [CqrsModule],
  providers: [QueryBus],
  exports: [QueryBus],
})
export class QueryBusModule {}
