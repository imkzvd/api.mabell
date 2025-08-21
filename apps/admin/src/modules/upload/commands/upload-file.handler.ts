import { CommandHandler } from '@api.mabell/cqrs';
import { App } from '@api.mabell/core';

@CommandHandler(App.CQRS.UploadFileCommand)
export class UploadFileHandler extends App.CQRS.UploadFileHandler {
  constructor(service: App.Components.Upload.UploadService) {
    super(service);
  }
}
