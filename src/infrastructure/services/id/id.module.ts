import { Global, Module } from '@nestjs/common';
import { IdServiceAdapter } from './id-service.adapter';
import { ID_SERVICE_DI_TOKEN } from '../../../core/app/common/ports/id.service.port';

@Global()
@Module({
  providers: [
    {
      provide: ID_SERVICE_DI_TOKEN,
      useClass: IdServiceAdapter,
    },
  ],
  exports: [
    {
      provide: ID_SERVICE_DI_TOKEN,
      useClass: IdServiceAdapter,
    },
  ],
})
export class IdModule {}
