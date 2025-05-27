import { Genre } from '../../../../common/constants/genres';
import { PlaylistId } from '../../types';
import { UserId } from '../../../user/types';
import { TrackId } from '../../../track/types';

export class PlaylistDTO {
  constructor(
    public readonly id: PlaylistId,
    public readonly name: string,
    public readonly owner: UserId | null,
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
