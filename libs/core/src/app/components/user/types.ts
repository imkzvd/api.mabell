import { Genre, Region } from '../../../domain/common';

export type UpdateUserPayload = Partial<{
  name: string;
  birthDate: Date | null;
  region: Region;
  genres: Genre[];
  isPremium: boolean;
  isBlocked: boolean;
}>;

export type RegisterUserPayload = {
  email: string;
  password: string;
  name: string;
  birthDate: Date;
};

export type UpdateUserPasswordPayload = {
  password: string;
  newPassword: string;
};

export type UpdateUserAvatarPayload = Partial<{
  fileId: string | null;
  color: string | null;
}>;

export type LoginUserPayload = {
  username: string;
  password: string;
};
