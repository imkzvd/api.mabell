import { Module } from '@nestjs/common';
import { PasswordServiceAdapter } from './password-service.adapter';
import { PASSWORD_SERVICE_DI_TOKEN } from '../../../core/app/common/services/password-service.port';

@Module({
  providers: [
    {
      provide: PASSWORD_SERVICE_DI_TOKEN,
      useClass: PasswordServiceAdapter,
    },
  ],
  exports: [
    {
      provide: PASSWORD_SERVICE_DI_TOKEN,
      useClass: PasswordServiceAdapter,
    },
  ],
})
export class PasswordModule {}
