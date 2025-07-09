import { Provider } from '@nestjs/common';
import { UserWriteRepository as UserWriteRepositoryPort } from '@core/domain/components/user/repository/user-write-repository.port';
import { UserWriteRepository } from '@infrastructure/mongoose/services/user/user-write-repository.service';
import { UserVerificationService } from '@core/app/components/user/services/user-verification.service';

export const userVerificationServiceProvider: Provider = {
  provide: UserVerificationService,
  useFactory: (wr: UserWriteRepositoryPort) => new UserVerificationService(wr),
  inject: [UserWriteRepository],
};
