import { Global, Module } from '@nestjs/common';
import { CommandBus } from './command-bus.service';

@Global()
@Module({
  providers: [CommandBus],
  exports: [CommandBus],
})
export class CommandBusModule {}
