import { EventEmitter } from 'eventemitter3';
import {
  Event,
  EventBus,
  EventConstructor,
  EventHandler,
  EventPayload,
} from '../../../core/app/common/services/event-bus.port';

export class InMemoryEventBusAdapter implements EventBus {
  private readonly emitter: EventEmitter;

  constructor() {
    this.emitter = new EventEmitter();
  }

  publish<T extends EventPayload>(event: Event<T>): void {
    this.emitter.emit(event.name, event.payload);
  }

  subscribe<T extends EventPayload>(
    eventClass: EventConstructor<T>,
    callback: EventHandler<T>,
  ): void {
    const eventInstance = new eventClass({} as T);

    // eslint-disable-next-line @typescript-eslint/no-misused-promises
    this.emitter.on(eventInstance.name, callback);
  }

  unsubscribe<T extends EventPayload>(
    eventClass: EventConstructor<T>,
    callback: EventHandler<T>,
  ): void {
    const eventInstance = new eventClass({} as T);

    // eslint-disable-next-line @typescript-eslint/no-misused-promises
    this.emitter.off(eventInstance.name, callback);
  }
}
