import { QueryHandler } from '@nestjs/cqrs';
import { Inject } from '@nestjs/common';
import { GetFileHandler as CoreGetFileHandler } from '@core/app/cqrs/upload/queries/get-file/get-file.handler';
import { GetFileQuery } from '@core/app/cqrs/upload/queries/get-file/get-file.query';
import { UploadService } from '@core/app/components/upload/upload.service';

@QueryHandler(GetFileQuery)
export class GetFileHandler extends CoreGetFileHandler {
  constructor(@Inject(UploadService) service: UploadService) {
    super(service);
  }
}
