import { CommandHandler } from '@api.mabell/cqrs';
import { App } from '@api.mabell/core';

@CommandHandler(App.CQRS.UpdateTrackFileCommand)
export class UpdateTrackFileHandler extends App.CQRS.UpdateTrackFileHandler {
  constructor(service: App.Components.Track.TrackUpdateService) {
    super(service);
  }
}
