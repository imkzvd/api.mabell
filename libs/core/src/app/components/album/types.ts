import { AlbumType } from '../../../domain/components/album/constants/album-types';
import { Genre } from '../../../domain/common/constants/genres';
import { ArtistId } from '../../../domain/components/artist/types';

export type CreateAlbumPayload = {
  artistId: ArtistId;
};

export type UpdateAlbumPayload = Partial<{
  name: string;
  type: AlbumType;
  genres: Genre[];
  description: string;
  releaseAt: Date | null;
  isActive: boolean;
  isPublic: boolean;
}>;

export type UpdateAlbumArtistsPayload = {
  artists: ArtistId[];
};

export type UpdateAlbumCoverPayload = Partial<{
  fileId: string | null;
  color: string | null;
}>;
