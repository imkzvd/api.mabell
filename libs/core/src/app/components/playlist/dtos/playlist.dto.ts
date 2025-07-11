import { PlaylistId } from '@core/domain/components/playlist/types';
import { Genre } from '@core/domain/common/constants/genres';
import { TrackId } from '@core/domain/components/track/types';
import { UserDTO } from '@core/app/components/user/dtos/user.dto';

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
