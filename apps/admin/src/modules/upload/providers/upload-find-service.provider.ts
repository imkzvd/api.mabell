import { Provider } from '@nestjs/common';
import { TmpFileStorage as TmpFileStoragePort } from '@core/app/common/ports/file-storages/tmp-file-storage.port';
import { TmpFileStorage } from '@infrastructure/file-storage';
import { UploadFindService } from '@core/app/components/upload/services/upload-find.service';

export const uploadFindServiceProvider: Provider = {
  provide: UploadFindService,
  useFactory: (fs: TmpFileStoragePort) => new UploadFindService(fs),
  inject: [TmpFileStorage],
};
