import { QueryHandler } from '@api.mabell/cqrs';
import { App } from '@api.mabell/core';

@QueryHandler(App.CQRS.GetFileQuery)
export class GetFileHandler extends App.CQRS.GetFileHandler {
  constructor(service: App.Components.Upload.UploadFindService) {
    super(service);
  }
}
