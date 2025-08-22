import { ADMIN_PASSWORD_LENGTH } from '../constants';
import { AdminFactory, AdminWriteRepository } from '../../../../domain/components/admin';
import { EventBus, IdService, PasswordService } from '../../../ports';
import { AdminId } from '../../../../domain/components/admin';
import { AdminCreatedEvent } from '../../../events';

export class AdminCreateService {
  constructor(
    private readonly _EB: EventBus,
    private readonly _WR: AdminWriteRepository,
    private readonly _idService: IdService,
    private readonly _passwordService: PasswordService,
  ) {}

  async create(): Promise<AdminId> {
    const generatedId = this._idService.generate<AdminId>();
    const { hashPassword } = await this._passwordService.generate({
      length: ADMIN_PASSWORD_LENGTH,
      hash: true,
    });

    const nextAdminIndex = await this._WR.getNextIndex();
    const createdAdmin = AdminFactory.create({
      id: generatedId,
      username: `account${nextAdminIndex}`,
      password: hashPassword,
      name: `Account #${nextAdminIndex}`,
    });

    await this._WR.save(createdAdmin);

    this._EB.publish(new AdminCreatedEvent({ id: generatedId }));

    return createdAdmin.getId();
  }
}
