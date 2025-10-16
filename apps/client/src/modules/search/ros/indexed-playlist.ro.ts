import * as process from 'process';
import { ApiProperty } from '@nestjs/swagger';
import { faker } from '@faker-js/faker';
import { App } from '@api.mabell/core';
import { IndexedSimplifiedUserRO } from './indexed-simplified-user.ro';

export class IndexedPlaylistRO {
  @ApiProperty({ description: 'Id', example: faker.database.mongodbObjectId() })
  id: string;

  @ApiProperty({ description: 'Name', example: faker.person.firstName() })
  name: string;

  @ApiProperty({ description: 'User', type: () => IndexedSimplifiedUserRO })
  user: IndexedSimplifiedUserRO;

  @ApiProperty({
    type: String,
    description: 'Cover',
    example: faker.image.url(),
    nullable: true,
  })
  cover: string | null;

  @ApiProperty({ type: String, description: 'Type' })
  type: string;

  constructor(dto: App.DTOs.IndexedPlaylistDTO) {
    this.id = dto.id;
    this.name = dto.name;
    this.user = new IndexedSimplifiedUserRO(dto.user);
    this.cover = dto.cover ? `${process.env.CLIENT_API_URL}${dto.cover}` : null;
    this.type = 'playlist';
  }
}
