import { UserId } from '../../../domain/components/user/types';
import { Genre } from '../../../domain/common/constants/genres';

export type CreatePlaylistPayload = {
  ownerId: UserId;
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
