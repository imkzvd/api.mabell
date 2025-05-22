import { Genre } from '../../../../common/constants/genres';

export class PlaylistDTO {
  constructor(
    public readonly id: string,
    public readonly name: string,
    public readonly owner: string | null,
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
