import { LabelValueDTO } from '../../shared/dtos';
import { UserId } from '../../domain/components/user/types';

export class UserDTO {
  constructor(
    public readonly id: UserId,
    public readonly username: string,
    public readonly password: string,
    public readonly name: string,
    public readonly email: string | null,
    public readonly birthDate: Date | null,
    public readonly region: LabelValueDTO,
    public readonly genres: LabelValueDTO[],
    public readonly avatar: string | null,
    public readonly color: string | null,
    public readonly isBlocked: boolean,
    public readonly isVerified: boolean,
    public readonly isPublic: boolean,
    public readonly isPremium: boolean,
    public readonly createdAt: Date,
    public readonly updatedAt: Date,
  ) {}
}
