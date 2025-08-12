import { Global, Module } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';
import { CommandBusService } from './command-bus.service';

@Global()
@Module({
  imports: [CqrsModule],
  providers: [CommandBusService],
  exports: [CommandBusService],
})
export class CommandBusModule {}
