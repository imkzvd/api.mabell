import { LabelValueDTO } from '../../shared/dtos';
import { AdminRefreshTokenId } from '../../domain/components/admin-refresh-token/types';

export class AdminRefreshTokenDTO {
  constructor(
    public readonly id: AdminRefreshTokenId,
    public readonly owner: string,
    public readonly role: LabelValueDTO,
    public readonly ip: string,
    public readonly userAgent: string,
    public readonly createdAt: Date,
  ) {}
}
