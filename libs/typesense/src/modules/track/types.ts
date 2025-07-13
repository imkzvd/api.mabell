export type TrackPayload = {
  id: string;
  name: string;
  album: { id: string; name: string; isPublic: boolean };
  artists: { id: string; name: string; isPublic: boolean }[];
  featArtists: { id: string; name: string; isPublic: boolean }[];
  cover: string | null;
  isPublic: boolean;
  isExplicit: boolean;
};
