import { Provider } from '@nestjs/common';
import { UploadService } from '@core/app/components/upload/upload.service';
import { TmpFileStorage as TmpFileStoragePort } from '@core/app/common/ports/file-storages/tmp-file-storage.port';
import { TmpFileStorage } from '@infrastructure/file-storage';

export const uploadServiceProvider: Provider = {
  provide: UploadService,
  useFactory: (fs: TmpFileStoragePort) => new UploadService(fs),
  inject: [TmpFileStorage],
};
