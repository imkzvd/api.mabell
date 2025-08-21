import { CommandHandler } from '@api.mabell/cqrs';
import { App } from '@api.mabell/core';

@CommandHandler(App.CQRS.DeleteAllFilesCommand)
export class DeleteAllFilesHandler extends App.CQRS.DeleteAllFilesHandler {
  constructor(service: App.Components.Upload.UploadDeleteService) {
    super(service);
  }
}
