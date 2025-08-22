import { AlbumId } from '../../../domain/components/album/types';
import { ArtistId } from '../../../domain/components/artist/types';

export type AlbumEventPayload = {
  id: AlbumId;
  name: string;
  artists: { id: ArtistId; name: string; isPublic: boolean }[];
  cover: string | null;
  isPublic: boolean;
};
