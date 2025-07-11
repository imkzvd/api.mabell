import { Provider } from '@nestjs/common';
import { UserReadRepository as UserReadRepositoryPort } from '@core/domain/components/user/repository/user-read-repository.port';
import { UserReadRepository } from '@infrastructure/mongoose/services/user/user-read-repository.service';
import { UserService } from '@core/app/components/user/services/user.service';

export const userServiceProvider: Provider = {
  provide: UserService,
  useFactory: (rr: UserReadRepositoryPort) => new UserService(rr),
  inject: [UserReadRepository],
};
