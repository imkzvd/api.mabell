import { CommandHandler } from '@api.mabell/cqrs';
import { App } from '@api.mabell/core';

@CommandHandler(App.CQRS.CreateTrackCommand)
export class CreateTrackHandler extends App.CQRS.CreateTrackHandler {
  constructor(
    albumVerifyService: App.Components.Album.AlbumVerifyService,
    albumService: App.Components.Album.AlbumService,
    trackCreateService: App.Components.Track.TrackCreateService,
  ) {
    super(albumVerifyService, albumService, trackCreateService);
  }
}
