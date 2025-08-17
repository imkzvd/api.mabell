import { AlbumId, AlbumType } from '../../../../domain/components/album';
import { Genre } from '../../../../domain/common';
import { ArtistDTO } from '../../artist';

export class AlbumDTO {
  constructor(
    public readonly id: AlbumId,
    public readonly name: string,
    public readonly artists: ArtistDTO[],
    public readonly type: AlbumType,
    public readonly genres: Genre[],
    public readonly cover: string | null,
    public readonly color: string | null,
    public readonly description: string,
    public readonly releaseAt: Date | null,
    public readonly isActive: boolean,
    public readonly isPublic: boolean,
    public readonly createdAt: Date,
    public readonly updatedAt: Date,
  ) {}
}
