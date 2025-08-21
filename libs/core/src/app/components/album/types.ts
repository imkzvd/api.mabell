import { Genre } from '../../../domain/common';
import { ArtistId } from '../../../domain/components/artist/types';
import { AlbumType } from '../../../domain/components/album/types';

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
