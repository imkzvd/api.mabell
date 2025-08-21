import { AdminId, AdminRole, getAdminRoleLabelByValue } from '../../domain/components/admin';
import { LabelValueDTO } from '../../shared/dtos';

export class AdminDTO {
  public readonly roleLabelValue: LabelValueDTO;

  constructor(
    public readonly id: AdminId,
    public readonly username: string,
    public readonly password: string,
    public readonly name: string,
    public readonly isBlocked: boolean,
    public readonly role: AdminRole,
    public readonly createdAt: Date,
    public readonly updatedAt: Date,
  ) {
    this.roleLabelValue = new LabelValueDTO(getAdminRoleLabelByValue(this.role), this.role);
  }
}
