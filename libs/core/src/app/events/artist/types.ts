import { ArtistId } from '../../../domain/components/artist/types';

export type ArtistEventPayload = {
  id: ArtistId;
  name: string;
  avatar: string | null;
  isPublic: boolean;
};
