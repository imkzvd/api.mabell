import { Global, Module } from '@nestjs/common';
import { CqrsModule as NestCqrsModule } from '@nestjs/cqrs';
import { CommandBus } from './command-bus.service';
import { QueryBus } from './query-bus.service';

@Global()
@Module({
  imports: [NestCqrsModule.forRoot()],
  providers: [CommandBus, QueryBus],
  exports: [CommandBus, QueryBus],
})
export class CqrsModule {}
