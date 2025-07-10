import { QueryHandler } from '@nestjs/cqrs';
import { GetFileHandler as CoreGetFileHandler } from '@core/app/cqrs/upload/queries/get-file/get-file.handler';
import { GetFileQuery } from '@core/app/cqrs/upload/queries/get-file/get-file.query';
import { UploadFindService } from '@core/app/components/upload/services/upload-find.service';

@QueryHandler(GetFileQuery)
export class GetFileHandler extends CoreGetFileHandler {
  constructor(service: UploadFindService) {
    super(service);
  }
}
