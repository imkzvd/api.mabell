import { Provider } from '@nestjs/common';
import { UserReadRepository as UserReadRepositoryPort } from '@core/domain/components/user/repository/user-read-repository.port';
import { PasswordService as PasswordServicePort } from '@core/app/common/ports/password-service.port';
import { UserReadRepository } from '@infrastructure/mongoose/services/user/user-read-repository.service';
import { PasswordService } from '@infrastructure/password';
import { UserLoginService } from '@core/app/components/user/services/user-login.service';

export const userLoginServiceProvider: Provider = {
  provide: UserLoginService,
  useFactory: (userRR: UserReadRepositoryPort, passwordService: PasswordServicePort) => {
    return new UserLoginService(userRR, passwordService);
  },
  inject: [UserReadRepository, PasswordService],
};
