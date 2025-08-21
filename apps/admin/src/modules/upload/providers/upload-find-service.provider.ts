import { Provider } from '@nestjs/common';
import { App } from '@api.mabell/core';
import { TmpFileStorage } from '@api.mabell/file-storage';

export const uploadFindServiceProvider: Provider = {
  provide: App.Components.Upload.UploadFindService,
  useFactory: (fs) => new App.Components.Upload.UploadFindService(fs),
  inject: [TmpFileStorage],
};
