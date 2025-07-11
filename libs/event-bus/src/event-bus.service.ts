import { Inject } from '@nestjs/common';
import { EventEmitter2 } from '@nestjs/event-emitter';
import {
  Event,
  EventBus as EventBusPort,
  EventConstructor,
  EventHandler,
  EventPayload,
} from '@core/app/common/ports/event-bus.port';

export class EventBus implements EventBusPort {
  constructor(@Inject(EventEmitter2) private readonly emitter: EventEmitter2) {}

  publish<T extends EventPayload>(event: Event<T>): void {
    this.emitter.emit(event.name, event);
  }

  subscribe<T extends Event<EventPayload>>(event: EventConstructor, handler: EventHandler<T>) {
    const eventInstance = new event({} as EventPayload);

    // eslint-disable-next-line @typescript-eslint/no-misused-promises
    this.emitter.on(eventInstance.name, handler.handle.bind(handler));
  }

  unsubscribe<T extends Event<EventPayload>>(event: EventConstructor, handler: EventHandler<T>) {
    const eventInstance = new event({} as EventPayload);

    // eslint-disable-next-line @typescript-eslint/no-misused-promises
    this.emitter.off(eventInstance.name, handler.handle.bind(handler));
  }
}
