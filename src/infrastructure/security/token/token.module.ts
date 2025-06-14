import { Module } from '@nestjs/common';
import { TOKEN_SERVICE_DI_TOKEN } from '../../../core/app/common/ports/token.service.port';
import { TokenServiceAdapter } from './token.service.adapter';

@Module({
  providers: [
    {
      provide: TOKEN_SERVICE_DI_TOKEN,
      useClass: TokenServiceAdapter,
    },
  ],
  exports: [
    {
      provide: TOKEN_SERVICE_DI_TOKEN,
      useClass: TokenServiceAdapter,
    },
  ],
})
export class TokenModule {}
