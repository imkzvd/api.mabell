import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { Inject } from '@nestjs/common';
import { GetFileByIdQuery } from './get-file-by-id.query';
import { TMP_FILE_STORAGE_DI_TOKEN, TmpFileStorage } from '../../storage/tmp-file-storage.port';

@QueryHandler(GetFileByIdQuery)
export class GetFileByIdHandler implements IQueryHandler<GetFileByIdQuery> {
  constructor(
    @Inject(TMP_FILE_STORAGE_DI_TOKEN)
    private readonly _tmpFileStorage: TmpFileStorage,
  ) {}

  async execute({ id }: GetFileByIdQuery) {
    return this._tmpFileStorage.findById(id);
  }
}
