import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { Inject } from '@nestjs/common';
import { GetFileHandler as CoreGetFileHandler } from '@core/app/cqrs/upload/queries/get-file/get-file.handler';
import { GetFileQuery } from '@core/app/cqrs/upload/queries/get-file/get-file.query';
import { UploadService } from '@core/app/components/upload/upload.service';

@QueryHandler(GetFileQuery)
export class GetFileHandler implements IQueryHandler<GetFileQuery> {
  private readonly coreHandler: CoreGetFileHandler;

  constructor(@Inject(UploadService) service: UploadService) {
    this.coreHandler = new CoreGetFileHandler(service);
  }

  async execute(query: GetFileQuery) {
    return this.coreHandler.execute(query);
  }
}
