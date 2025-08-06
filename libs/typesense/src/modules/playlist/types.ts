export type PlaylistPayload = {
  id: string;
  name: string;
  user: { id: string; name: string; isPublic: boolean };
  cover: string | null;
  isPublic: boolean;
};
