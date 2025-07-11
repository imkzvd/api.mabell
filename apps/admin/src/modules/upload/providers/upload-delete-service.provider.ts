import { Provider } from '@nestjs/common';
import { TmpFileStorage as TmpFileStoragePort } from '@core/app/common/ports/file-storages/tmp-file-storage.port';
import { TmpFileStorage } from '@infrastructure/file-storage';
import { UploadDeleteService } from '@core/app/components/upload/services/upload-delete.service';

export const uploadDeleteServiceProvider: Provider = {
  provide: UploadDeleteService,
  useFactory: (fs: TmpFileStoragePort) => new UploadDeleteService(fs),
  inject: [TmpFileStorage],
};
