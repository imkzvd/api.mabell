import { CommandHandler } from '@api.mabell/cqrs';
import { App } from '@api.mabell/core';

@CommandHandler(App.CQRS.DeleteFileCommand)
export class DeleteFileHandler extends App.CQRS.DeleteFileHandler {
  constructor(service: App.Components.Upload.UploadDeleteService) {
    super(service);
  }
}
