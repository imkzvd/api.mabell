import { Module } from '@nestjs/common';
import { JWT_SERVICE_DI_TOKEN } from '../../../core/app/common/ports/jwt.service.port';
import { JWTServiceAdapter } from './jwt.service.adapter';

@Module({
  providers: [
    {
      provide: JWT_SERVICE_DI_TOKEN,
      useClass: JWTServiceAdapter,
    },
  ],
  exports: [
    {
      provide: JWT_SERVICE_DI_TOKEN,
      useClass: JWTServiceAdapter,
    },
  ],
})
export class JWTModule {}
