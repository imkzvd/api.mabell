export type PlaylistPayload = {
  id: string;
  name: string;
  owner: { id: string; name: string; isPublic: boolean };
  cover: string | null;
  isPublic: boolean;
};
