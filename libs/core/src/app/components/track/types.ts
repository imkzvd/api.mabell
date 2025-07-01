import { AlbumId } from '@core/domain/components/album/types';
import { ArtistId } from '@core/domain/components/artist/types';

export type CreateTrackPayload = {
  artistIds: ArtistId[];
  albumId: AlbumId;
};

export type UpdateTrackPayload = Partial<{
  name: string;
  isExplicit: boolean;
  isActive: boolean;
  isPublic: boolean;
}>;

export type UpdateTrackFilePayload = {
  fileId: string;
  duration: number;
};

export type UpdateTrackArtistsPayload = {
  artistIds: ArtistId[];
};

export type UpdateTrackFeatArtistsPayload = {
  artistIds: ArtistId[];
};
