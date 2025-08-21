import * as process from 'process';
import { ApiProperty } from '@nestjs/swagger';
import { faker } from '@faker-js/faker';
import { App } from '@api.mabell/core';

export class IndexedUserRO {
  @ApiProperty({ description: 'Id', example: faker.database.mongodbObjectId() })
  id: string;

  @ApiProperty({ description: 'Name', example: faker.internet.username() })
  name: string;

  @ApiProperty({
    type: String,
    description: 'Email',
    example: faker.internet.email(),
    nullable: true,
  })
  email: string | null;

  @ApiProperty({
    type: String,
    description: 'Avatar',
    example: faker.image.url(),
    nullable: true,
  })
  avatar: string | null;

  constructor(dto: App.DTOs.IndexedUserDTO) {
    this.id = dto.id;
    this.name = dto.name;
    this.email = dto.email;
    this.avatar = dto.avatar ? `${process.env.API_URL}${dto.avatar}` : null;
  }
}
