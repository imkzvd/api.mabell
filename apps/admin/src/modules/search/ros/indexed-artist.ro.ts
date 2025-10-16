import * as process from 'process';
import { ApiProperty } from '@nestjs/swagger';
import { faker } from '@faker-js/faker';
import { App } from '@api.mabell/core';

export class IndexedArtistRO {
  @ApiProperty({ description: 'Id', example: faker.database.mongodbObjectId() })
  id: string;

  @ApiProperty({ description: 'Name', example: faker.person.firstName() })
  name: string;

  @ApiProperty({
    type: String,
    description: 'Avatar',
    example: faker.image.url(),
    nullable: true,
  })
  avatar: string | null;

  @ApiProperty({ type: String, description: 'Type' })
  type: string;

  constructor(dto: App.DTOs.IndexedArtistDTO) {
    this.id = dto.id;
    this.name = dto.name;
    this.avatar = dto.avatar ? `${process.env.ADMIN_API_URL}${dto.avatar}` : null;
    this.type = 'artist';
  }
}
