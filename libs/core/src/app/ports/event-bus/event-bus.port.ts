import { Event, EventConstructor, EventHandler, EventPayload } from './types';

export interface EventBus {
  publish<T extends EventPayload>(event: Event<T>): void;

  subscribe<T extends Event<EventPayload>>(event: EventConstructor, handler: EventHandler<T>): void;

  unsubscribe<T extends Event<EventPayload>>(
    event: EventConstructor,
    handler: EventHandler<T>,
  ): void;
}
