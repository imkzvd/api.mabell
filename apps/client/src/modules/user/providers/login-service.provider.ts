import { Provider } from '@nestjs/common';
import { LoginService } from '@core/app/components/login/login.service';
import { AdminReadRepository as AdminReadRepositoryPort } from '@core/domain/components/admin/repository/admin-read-repository.port';
import { UserReadRepository as UserReadRepositoryPort } from '@core/domain/components/user/repository/user-read-repository.port';
import { PasswordService as PasswordServicePort } from '@core/app/common/ports/password-service.port';
import { AdminReadRepository } from '@infrastructure/mongoose/services/admin/admin-read-repository.service';
import { UserReadRepository } from '@infrastructure/mongoose/services/user/user-read-repository.service';
import { PasswordService } from '@infrastructure/password';

export const loginServiceProvider: Provider = {
  provide: LoginService,
  useFactory: (
    adminRR: AdminReadRepositoryPort,
    userRR: UserReadRepositoryPort,
    passwordService: PasswordServicePort,
  ) => {
    return new LoginService(adminRR, userRR, passwordService);
  },
  inject: [AdminReadRepository, UserReadRepository, PasswordService],
};
