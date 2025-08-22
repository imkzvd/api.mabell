import { TrackId } from '../../../domain/components/track/types';
import { AlbumId } from '../../../domain/components/album/types';
import { ArtistId } from '../../../domain/components/artist/types';

export type TrackEventPayload = {
  id: TrackId;
  name: string;
  album: { id: AlbumId; name: string; isPublic: boolean };
  artists: { id: ArtistId; name: string; isPublic: boolean }[];
  featArtists: { id: ArtistId; name: string; isPublic: boolean }[];
  cover: string | null;
  isPublic: boolean;
  isExplicit: boolean;
};
