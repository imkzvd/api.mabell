import { Inject, Injectable } from '@nestjs/common';
import { App } from '@api.mabell/core';
import { UserCollection } from './user.collection';
import UserMapper from './user.mapper';
import { UsersDTO } from './dtos/users.dto';

@Injectable()
export class UserService {
  constructor(@Inject(UserCollection) private readonly _userCollection: UserCollection) {}

  async getByQuery(
    q: string,
    options?: Partial<{
      isGlobal: boolean;
    }>,
  ): Promise<UsersDTO> {
    const foundDocs = await this._userCollection.findByQuery(q, options);

    return new UsersDTO(
      foundDocs.items.map(({ item, score }) => ({
        item: UserMapper.toDTO(item),
        score,
      })),
      foundDocs.total,
      foundDocs.offset,
      foundDocs.limit,
    );
  }

  async getById(
    id: string,
    options?: Partial<{
      isGlobal: boolean;
    }>,
  ): Promise<App.DTOs.IndexedUserDTO | null> {
    const foundDoc = await this._userCollection.findById(id, options);

    return foundDoc ? UserMapper.toDTO(foundDoc) : null;
  }

  async getByIds(
    ids: string[],
    options?: Partial<{
      isGlobal: boolean;
    }>,
  ): Promise<App.DTOs.IndexedUserDTO[]> {
    const foundDocs = await this._userCollection.findByIds(ids, options);
    const mapIds = new Map<string, number>();

    ids.forEach((id, index) => mapIds.set(id, index));

    foundDocs.sort((a, b) => mapIds.get(a.id)! - mapIds.get(b.id)!);

    return foundDocs.map((doc) => UserMapper.toDTO(doc));
  }
}
