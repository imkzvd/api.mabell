import { Provider } from '@nestjs/common';
import { App } from '@api.mabell/core';
import { TmpFileStorage } from '@api.mabell/file-storage';

export const uploadDeleteServiceProvider: Provider = {
  provide: App.Components.Upload.UploadDeleteService,
  useFactory: (fs) => new App.Components.Upload.UploadDeleteService(fs),
  inject: [TmpFileStorage],
};
