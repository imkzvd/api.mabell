import { Genre } from '../../../../../../domain/common/constants/genres';
import { UserDTO } from '../../../../user/ports/repository/dtos/user.dto';

export class PlaylistWithOwnerDTO {
  constructor(
    public readonly id: string,
    public readonly owner: UserDTO,
    public readonly name: string,
    public readonly genres: Genre[],
    public readonly cover: string | null,
    public readonly color: string | null,
    public readonly description: string,
    public readonly tracks: { id: string; addedAt: Date }[],
    public readonly isPublic: boolean,
    public readonly createdAt: Date,
    public readonly updatedAt: Date,
  ) {}
}
