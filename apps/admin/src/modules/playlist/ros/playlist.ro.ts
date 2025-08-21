import * as process from 'process';
import { ApiProperty } from '@nestjs/swagger';
import { faker } from '@faker-js/faker';
import { App } from '@api.mabell/core';
import { LabelValueRO } from '@api.mabell/shared';
import { SimplifiedUserRO } from '../../user/ros/simplified-user.ro';

export class PlaylistRO {
  @ApiProperty({
    type: String,
    description: 'Id',
    example: faker.database.mongodbObjectId(),
  })
  id: string;

  @ApiProperty({ type: String, description: 'User id' })
  userId: string;

  @ApiProperty({ type: () => SimplifiedUserRO, description: 'User' })
  user: SimplifiedUserRO;

  @ApiProperty({
    type: String,
    description: 'Name',
    example: faker.music.songName(),
  })
  name: string;

  @ApiProperty({
    type: () => [LabelValueRO],
    description: 'Genres',
  })
  genres: LabelValueRO[];

  @ApiProperty({
    type: String,
    description: 'Cover',
    example: faker.image.url(),
    nullable: true,
  })
  cover: string | null;

  @ApiProperty({
    type: String,
    description: 'Accent color',
    example: faker.color.rgb(),
    nullable: true,
  })
  color: string | null;

  @ApiProperty({
    type: String,
    description: 'Description',
    example: faker.lorem.text(),
  })
  description: string;

  @ApiProperty({ type: Boolean, description: 'Public', example: false })
  isPublic: boolean;

  @ApiProperty({
    description: 'Created date',
    example: faker.date.past().toISOString(),
  })
  createdAt: Date;

  @ApiProperty({
    description: 'Updated date',
    example: faker.date.past().toISOString(),
  })
  updatedAt: Date;

  constructor(dto: App.DTOs.PlaylistDTO) {
    this.id = dto.id;
    this.name = dto.name;
    this.userId = dto.user.id;
    this.user = new SimplifiedUserRO(dto.user);
    this.genres = dto.genreLabelValues.map((i) => new LabelValueRO(i));
    this.cover = dto.cover ? `${process.env.API_URL}${dto.cover}` : null;
    this.color = dto.color;
    this.description = dto.description;
    this.isPublic = dto.isPublic;
    this.createdAt = dto.createdAt;
    this.updatedAt = dto.updatedAt;
  }
}
