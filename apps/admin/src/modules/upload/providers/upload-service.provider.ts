import { Provider } from '@nestjs/common';
import { App } from '@api.mabell/core';
import { TmpFileStorage } from '@api.mabell/file-storage';

export const uploadServiceProvider: Provider = {
  provide: App.Components.Upload.UploadService,
  useFactory: (fs) => new App.Components.Upload.UploadService(fs),
  inject: [TmpFileStorage],
};
