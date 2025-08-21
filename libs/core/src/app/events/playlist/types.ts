import { PlaylistId } from '../../../domain/components/playlist/types';
import { UserId } from '../../../domain/components/user/types';

export type PlaylistEventPayload = {
  id: PlaylistId;
  name: string;
  user: { id: UserId; name: string; isPublic: boolean };
  cover: string | null;
  isPublic: boolean;
};
