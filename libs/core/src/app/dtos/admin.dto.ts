import { LabelValueDTO } from '../../shared/dtos';
import { AdminId, AdminRole } from '../../domain/components/admin/types';

export class AdminDTO {
  constructor(
    public readonly id: AdminId,
    public readonly username: string,
    public readonly password: string,
    public readonly name: string,
    public readonly isBlocked: boolean,
    public readonly role: LabelValueDTO<AdminRole>,
    public readonly createdAt: Date,
    public readonly updatedAt: Date,
  ) {}
}
