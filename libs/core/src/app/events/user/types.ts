import { UserId } from '../../../domain/components/user/types';

export type UserEventPayload = {
  id: UserId;
  name: string;
  email: string | null;
  avatar: string | null;
};
