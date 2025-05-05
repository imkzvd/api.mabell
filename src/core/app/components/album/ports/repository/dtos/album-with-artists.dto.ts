import { ArtistDTO } from '../../../../artist/ports/repository/dtos/artist.dto';
import { AlbumType } from '../../../../../../domain/components/album/constants/album-types';
import { Genre } from '../../../../../../domain/common/constants/genres';

export class AlbumWithArtistsDTO {
  constructor(
    public readonly id: string,
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
