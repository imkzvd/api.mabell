import { AlbumType } from '../../../../domain/components/album/constants/album-types';
import { ArtistDTO } from '../../artist/dtos/artist.dto';
import { Genre } from '../../../../domain/common/constants/genres';
import { SimplifiedTrackDTO } from '../../track/dtos/simplified-track.dto';

export class AlbumWithArtistsAndTracksDTO {
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
    public readonly tracks: SimplifiedTrackDTO[],
    public readonly isActive: boolean,
    public readonly isPublic: boolean,
    public readonly createdAt: Date,
    public readonly updatedAt: Date,
  ) {}
}
