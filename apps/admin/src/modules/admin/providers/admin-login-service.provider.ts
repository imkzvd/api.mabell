import { Provider } from '@nestjs/common';
import { AdminReadRepository as AdminReadRepositoryPort } from '@core/domain/components/admin/repository/admin-read-repository.port';
import { PasswordService as PasswordServicePort } from '@core/app/common/ports/password-service.port';
import { AdminLoginService } from '@core/app/components/admin/services/admin-login.service';
import { AdminReadRepository } from '@infrastructure/mongoose/services/admin/admin-read-repository.service';
import { PasswordService } from '@infrastructure/password';

export const adminLoginServiceProvider: Provider = {
  provide: AdminLoginService,
  useFactory: (adminRR: AdminReadRepositoryPort, passwordService: PasswordServicePort) => {
    return new AdminLoginService(adminRR, passwordService);
  },
  inject: [AdminReadRepository, PasswordService],
};
