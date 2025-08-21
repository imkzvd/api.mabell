import { User } from '../../../../domain/components/user';
import { UserEventPayload } from '../../../events/user/types';

export function prepareUserEventPayload(user: User): UserEventPayload {
  return {
    id: user.getId(),
    name: user.getName().value,
    email: user.getEmail()?.value || null,
    avatar: user.getAvatar(),
  };
}
