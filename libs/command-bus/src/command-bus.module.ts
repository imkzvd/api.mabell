import { Global, Module } from '@nestjs/common';
import { CommandBus } from '@infrastructure/command-bus/command-bus.service';

@Global()
@Module({
  providers: [CommandBus],
  exports: [CommandBus],
})
export class CommandBusModule {}
