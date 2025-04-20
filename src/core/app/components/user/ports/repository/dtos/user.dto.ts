import { Region } from '../../../../../../domain/common/constants/regions';
import { Genre } from '../../../../../../domain/common/constants/genres';

export class UserDTO {
  constructor(
    public readonly id: string,
    public readonly username: string,
    public readonly name: string,
    public readonly email: string | null,
    public readonly birthDate: Date,
    public readonly region: Region,
    public readonly genres: Genre[],
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
