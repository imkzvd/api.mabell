import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { Inject } from '@nestjs/common';
import { GetFileQuery } from './get-file.query';
import { UploadService } from '../../upload.service';

@QueryHandler(GetFileQuery)
export class GetFileHandler implements IQueryHandler<GetFileQuery> {
  constructor(@Inject(UploadService) private readonly _uploadService: UploadService) {}

  async execute({ id }: GetFileQuery) {
    return this._uploadService.getFile(id);
  }
}
