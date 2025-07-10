import { QueryHandler } from '@core/app/types';
import { GetFileQuery } from '@core/app/cqrs/upload/queries/get-file/get-file.query';
import { UploadFindService } from '@core/app/components/upload/services/upload-find.service';

export class GetFileHandler implements QueryHandler<GetFileQuery> {
  constructor(private readonly _service: UploadFindService) {}

  async execute({ id }: GetFileQuery) {
    return this._service.find(id);
  }
}
