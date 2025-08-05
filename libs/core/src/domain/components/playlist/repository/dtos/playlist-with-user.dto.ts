import { Genre } from '../../../../common/constants/genres';
import { UserDTO } from '../../../user/repository/dtos/user.dto';
import { PlaylistId } from '../../types';
import { TrackId } from '../../../track/types';

export class PlaylistWithUserDTO {
  constructor(
    public readonly id: PlaylistId,
    public readonly user: UserDTO,
    public readonly name: string,
    public readonly genres: Genre[],
    public readonly cover: string | null,
    public readonly color: string | null,
    public readonly description: string,
    public readonly tracks: { id: TrackId; addedAt: Date }[],
    public readonly isPublic: boolean,
    public readonly createdAt: Date,
    public readonly updatedAt: Date,
  ) {}
}
