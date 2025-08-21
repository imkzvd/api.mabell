import { CommandHandler } from '@api.mabell/cqrs';
import { App } from '@api.mabell/core';

@CommandHandler(App.CQRS.DeleteTrackFileCommand)
export class DeleteTrackFileHandler extends App.CQRS.DeleteTrackFileHandler {
  constructor(service: App.Components.Track.TrackUpdateService) {
    super(service);
  }
}
