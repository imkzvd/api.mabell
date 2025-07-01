import { QueryHandler } from '@core/app/types';
import { UploadService } from '@core/app/components/upload/upload.service';
import { GetFileQuery } from '@core/app/cqrs/upload/queries/get-file/get-file.query';

export class GetFileHandler implements QueryHandler<GetFileQuery> {
  constructor(private readonly _uploadService: UploadService) {}

  async execute({ id }: GetFileQuery) {
    return this._uploadService.getFile(id);
  }
}
