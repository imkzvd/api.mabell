export type AlbumPayload = {
  id: string;
  name: string;
  artists: { id: string; name: string; isPublic: boolean }[];
  cover: string | null;
  isPublic: boolean;
};
