import { Global, Module } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';
import { CommandBus } from './command-bus.service';

@Global()
@Module({
  imports: [CqrsModule],
  providers: [CommandBus],
  exports: [CommandBus],
})
export class CommandBusModule {}
