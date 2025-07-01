import { Global, Module } from '@nestjs/common';
import { RandomIdService } from './random-id.service';

@Global()
@Module({
  providers: [RandomIdService],
  exports: [RandomIdService],
})
export class RandomIdModule {}
