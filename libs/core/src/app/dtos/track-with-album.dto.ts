import { AlbumDTO } from './album.dto';
import { TrackId } from '../../domain/components/track/types';
import { SimplifiedArtistDTO } from './simplified-artist.dto';

export class TrackWithAlbumDTO {
  constructor(
    public readonly id: TrackId,
    public readonly name: string,
    public readonly album: AlbumDTO,
    public readonly featArtists: SimplifiedArtistDTO[],
    public readonly file: string | null,
    public readonly duration: number | null,
    public readonly trackNumber: number,
    public readonly isExplicit: boolean,
    public readonly isActive: boolean,
    public readonly isPublic: boolean,
    public readonly createdAt: Date,
    public readonly updatedAt: Date,
  ) {}
}
