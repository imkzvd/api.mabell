import { Provider } from '@nestjs/common';
import { UserWriteRepository as UserWriteRepositoryPort } from '@core/domain/components/user/repository/user-write-repository.port';
import { UserWriteRepository } from '@infrastructure/mongoose/services/user/user-write-repository.service';
import { UserVerifyService } from '@core/app/components/user/services/user-verify.service';

export const userVerificationServiceProvider: Provider = {
  provide: UserVerifyService,
  useFactory: (wr: UserWriteRepositoryPort) => new UserVerifyService(wr),
  inject: [UserWriteRepository],
};
