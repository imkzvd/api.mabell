import { Provider } from '@nestjs/common';
import { AdminFindService } from '@core/app/components/admin/services/admin-find.service';
import { AdminReadRepository as AdminReadRepositoryPort } from '@core/domain/components/admin/repository/admin-read-repository.port';
import { AdminReadRepository } from '@infrastructure/mongoose/services/admin/admin-read-repository.service';

export const adminFindServiceProvider: Provider = {
  provide: AdminFindService,
  useFactory: (rr: AdminReadRepositoryPort) => new AdminFindService(rr),
  inject: [AdminReadRepository],
};
