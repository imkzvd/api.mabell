import { ArtistId } from '../../../domain/components/artist/types';
import { AlbumId } from '../../../domain/components/album/types';

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
