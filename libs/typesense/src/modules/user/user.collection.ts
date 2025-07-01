import { CollectionCreateSchema } from 'typesense/lib/Typesense/Collections';
import { IndexedUserDTO } from '@core/app/common/ports/search-service/dtos/indexed-user.dto';
import { UserDTO } from '@core/app/components/user/dtos/user.dto';
import UserMapper from './user.mapper';
import { User } from './user.document';
import { TypeSenseClient } from '../../client';
import { BaseCollection } from '../../base/base-collection.interface';

export class UserCollection implements BaseCollection<IndexedUserDTO, UserDTO> {
  private readonly _collectionName = 'users';
  private readonly _collectionSchema: CollectionCreateSchema = {
    name: this._collectionName,
    fields: [{ name: 'email', type: 'string', optional: true }],
  };

  constructor() {
    void this.createCollection();
  }

  async save(dto: UserDTO): Promise<void> {
    const mappedDoc = UserMapper.toDocument(dto);

    await TypeSenseClient.collections<User>(this._collectionName).documents().upsert(mappedDoc);
  }

  async searchByQuery(q: string): Promise<IndexedUserDTO[]> {
    const result = await TypeSenseClient.collections<User>(this._collectionName)
      .documents()
      .search({ q, query_by: 'email' });

    return result.hits?.map(({ document }) => UserMapper.toDTO(document)) || [];
  }

  async deleteById(id: string): Promise<void> {
    await TypeSenseClient.collections<User>(this._collectionName).documents(id).delete();
  }

  private async createCollection(): Promise<void> {
    const isExistCollection = await TypeSenseClient.collections(this._collectionName).exists();

    if (isExistCollection) return;

    await TypeSenseClient.collections().create(this._collectionSchema);
  }
}
