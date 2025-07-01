import { Genre } from '@core/domain/common/constants/genres';

export type UpdateArtistPayload = Partial<{
  name: string;
  birthName: string | null;
  birthDate: Date | null;
  genres: Genre[];
  biography: string;
  isActive: boolean;
  isPublic: boolean;
}>;

export type UpdateArtistAvatarPayload = Partial<{
  fileId: string | null;
  color: string | null;
}>;

export type UpdateArtistCoverPayload = Partial<{
  fileId: string | null;
  color: string | null;
}>;
