import { Provider } from '@nestjs/common';
import { UserFindService } from '@core/app/components/user/services/user-find.service';
import { UserReadRepository as UserReadRepositoryPort } from '@core/domain/components/user/repository/user-read-repository.port';
import { UserReadRepository } from '@infrastructure/mongoose/services/user/user-read-repository.service';

export const userFindServiceProvider: Provider = {
  provide: UserFindService,
  useFactory: (rr: UserReadRepositoryPort) => new UserFindService(rr),
  inject: [UserReadRepository],
};
