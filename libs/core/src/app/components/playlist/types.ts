import { Genre } from '../../../domain/common';
import { UserId } from '../../../domain/components/user/types';

export type CreatePlaylistPayload = {
  userId: UserId;
};

export type UpdatePlaylistPayload = Partial<{
  name: string;
  genres: Genre[];
  description: string;
  isPublic: boolean;
}>;

export type UpdatePlaylistCoverPayload = Partial<{
  fileId: string | null;
  color: string | null;
}>;
