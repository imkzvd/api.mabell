import { QueryHandler } from '@api.mabell/cqrs';
import { App } from '@api.mabell/core';

@QueryHandler(App.CQRS.GetTrackQuery)
export class GetTrackHandler extends App.CQRS.GetTrackHandler {
  constructor(service: App.Components.Track.TrackService) {
    super(service);
  }
}
