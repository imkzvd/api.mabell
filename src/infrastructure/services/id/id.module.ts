import { Global, Module } from '@nestjs/common';
import { IdService } from './id.service';
import { ID_SERVICE_DI_TOKEN } from '../../../core/app/common/ports/id.service.port';

@Global()
@Module({
  providers: [
    {
      provide: ID_SERVICE_DI_TOKEN,
      useClass: IdService,
    },
  ],
  exports: [
    {
      provide: ID_SERVICE_DI_TOKEN,
      useClass: IdService,
    },
  ],
})
export class IdModule {}
