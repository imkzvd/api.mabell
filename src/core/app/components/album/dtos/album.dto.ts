import { AlbumType } from '../../../../domain/components/album/constants/album-types';
import { Genre } from '../../../../domain/common/constants/genres';
import { ArtistDTO } from '../../artist/dtos/artist.dto';
import { AlbumId } from '../../../../domain/components/album/types';

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
