import { Module } from '@nestjs/common';
import { PasswordService } from './password.service';
import { PASSWORD_SERVICE_DI_TOKEN } from '../../../core/app/common/ports/password-service.port';

@Module({
  providers: [
    {
      provide: PASSWORD_SERVICE_DI_TOKEN,
      useClass: PasswordService,
    },
  ],
  exports: [
    {
      provide: PASSWORD_SERVICE_DI_TOKEN,
      useClass: PasswordService,
    },
  ],
})
export class PasswordModule {}
