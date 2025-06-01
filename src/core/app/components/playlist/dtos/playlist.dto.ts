import { PlaylistId } from '../../../../domain/components/playlist/types';
import { Genre } from '../../../../domain/common/constants/genres';
import { UserDTO } from '../../user/dtos/user.dto';
import { TrackId } from '../../../../domain/components/track/types';

export class PlaylistDTO {
  constructor(
    public readonly id: PlaylistId,
    public readonly owner: UserDTO,
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
