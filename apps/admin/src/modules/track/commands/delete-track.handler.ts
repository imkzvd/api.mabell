import { CommandHandler } from '@api.mabell/cqrs';
import { App } from '@api.mabell/core';

@CommandHandler(App.CQRS.DeleteTrackCommand)
export class DeleteTrackHandler extends App.CQRS.DeleteTrackHandler {
  constructor(service: App.Components.Track.TrackDeleteService) {
    super(service);
  }
}
