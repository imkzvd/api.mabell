import { Module } from '@nestjs/common';
import { JWT_SERVICE_DI_TOKEN } from '../../../core/app/common/ports/jwt.service.port';
import { JwtService } from './jwt.service';

@Module({
  providers: [
    {
      provide: JWT_SERVICE_DI_TOKEN,
      useClass: JwtService,
    },
  ],
  exports: [
    {
      provide: JWT_SERVICE_DI_TOKEN,
      useClass: JwtService,
    },
  ],
})
export class JWTModule {}
