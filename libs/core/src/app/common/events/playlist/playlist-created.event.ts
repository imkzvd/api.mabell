import { Event } from '@core/app/common/ports/event-bus.port';
import { PlaylistId } from '@core/domain/components/playlist/types';
import { UserId } from '@core/domain/components/user/types';

export type PlaylistCreatedEventPayload = {
  id: PlaylistId;
  name: string;
  user: { id: UserId; name: string; isPublic: boolean };
  cover: string | null;
  isPublic: boolean;
};

export class PlaylistCreatedEvent extends Event<PlaylistCreatedEventPayload> {
  public readonly name = 'playlist.created';

  constructor(public readonly payload: PlaylistCreatedEventPayload) {
    super();
  }
}
