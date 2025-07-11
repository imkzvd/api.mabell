import { Provider } from '@nestjs/common';
import { AdminReadRepository as AdminReadRepositoryPort } from '@core/domain/components/admin/repository/admin-read-repository.port';
import { AdminReadRepository } from '@infrastructure/mongoose/services/admin/admin-read-repository.service';
import { AdminService } from '@core/app/components/admin/services/admin.service';

export const adminServiceProvider: Provider = {
  provide: AdminService,
  useFactory: (rr: AdminReadRepositoryPort) => new AdminService(rr),
  inject: [AdminReadRepository],
};
