import { Region } from '../../../domain/common/constants/regions';
import { Genre } from '../../../domain/common/constants/genres';

export type UpdateUserPayload = Partial<{
  name: string;
  birthDate: Date | null;
  region: Region;
  genres: Genre[];
  isPremium: boolean;
  isBlocked: boolean;
}>;

export type RegisterUserPayload = {
  username: string;
  password: string;
  name: string;
  email: string;
  birthDate: Date;
  region: Region;
};

export type UpdateUserPasswordPayload = {
  password: string;
  newPassword: string;
};

export type UpdateUserAvatarPayload = Partial<{
  fileId: string | null;
  color: string | null;
}>;
