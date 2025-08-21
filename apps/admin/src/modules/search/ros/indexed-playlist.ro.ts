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

  @ApiProperty({ description: 'Owner', type: () => IndexedSimplifiedUserRO })
  owner: IndexedSimplifiedUserRO;

  @ApiProperty({
    type: String,
    description: 'Cover',
    example: faker.image.url(),
    nullable: true,
  })
  cover: string | null;

  @ApiProperty({ type: Boolean, description: 'Public', example: true })
  isPublic: boolean;

  constructor(dto: App.DTOs.IndexedPlaylistDTO) {
    this.id = dto.id;
    this.name = dto.name;
    this.owner = new IndexedSimplifiedUserRO(dto.owner);
    this.cover = dto.cover ? `${process.env.API_URL}${dto.cover}` : null;
  }
}
