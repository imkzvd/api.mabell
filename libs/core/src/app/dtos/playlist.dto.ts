import { SimplifiedUserDTO } from './simplified-user.dto';
import { LabelValueDTO } from '../../shared/dtos';
import { PlaylistId } from '../../domain/components/playlist/types';
import { TrackId } from '../../domain/components/track/types';

export class PlaylistDTO {
  constructor(
    public readonly id: PlaylistId,
    public readonly user: SimplifiedUserDTO,
    public readonly name: string,
    public readonly genres: LabelValueDTO[],
    public readonly cover: string | null,
    public readonly color: string | null,
    public readonly description: string,
    public readonly tracks: { id: TrackId; addedAt: Date }[],
    public readonly isPublic: boolean,
    public readonly createdAt: Date,
    public readonly updatedAt: Date,
  ) {}
}
