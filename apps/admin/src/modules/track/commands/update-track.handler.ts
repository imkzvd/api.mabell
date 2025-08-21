import { CommandHandler } from '@api.mabell/cqrs';
import { App } from '@api.mabell/core';

@CommandHandler(App.CQRS.UpdateTrackCommand)
export class UpdateTrackHandler extends App.CQRS.UpdateTrackHandler {
  constructor(service: App.Components.Track.TrackUpdateService) {
    super(service);
  }
}
