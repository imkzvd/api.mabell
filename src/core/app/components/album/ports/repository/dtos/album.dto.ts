import { AlbumType } from '../../../../../../domain/components/album/constants/album-types';
import { Genre } from '../../../../../../domain/common/constants/genres';

export class AlbumDTO {
  constructor(
    public readonly id: string,
    public readonly name: string,
    public readonly artists: string[],
    public readonly type: AlbumType,
    public readonly genres: Genre[],
    public readonly cover: string | null,
    public readonly color: string | null,
    public readonly description: string,
    public readonly releaseAt: Date | null,
    public readonly tracks: string[],
    public readonly isActive: boolean,
    public readonly isPublic: boolean,
    public readonly createdAt: Date,
    public readonly updatedAt: Date,
  ) {}
}
