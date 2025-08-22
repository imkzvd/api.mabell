import { QueryHandler } from '../../../../types';
import { GetFileQuery } from './get-file.query';
import { UploadFindService } from '../../../../components/upload';

export class GetFileHandler implements QueryHandler<GetFileQuery> {
  constructor(private readonly _service: UploadFindService) {}

  execute({ id }: GetFileQuery) {
    return this._service.findById(id);
  }
}
