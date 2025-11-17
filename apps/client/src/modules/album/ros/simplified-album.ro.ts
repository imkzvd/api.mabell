import { ApiProperty } from '@nestjs/swagger';
import { faker } from '@faker-js/faker';
import * as process from 'process';
import { App } from '@api.mabell/core';
import { LabelValueRO } from '@api.mabell/shared';

export class SimplifiedAlbumRO {
  @ApiProperty({
    type: String,
    description: 'Id',
    example: faker.database.mongodbObjectId(),
  })
  id: string;

  @ApiProperty({
    type: String,
    description: 'Name',
    example: faker.music.songName(),
  })
  name: string;

  @ApiProperty({ type: () => LabelValueRO, description: 'Type' })
  type: LabelValueRO;

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
    type: Date,
    description: 'Release date',
    example: faker.date.past().toISOString(),
    nullable: true,
  })
  releaseAt: Date | null;

  constructor(album: App.DTOs.AlbumDTO) {
    this.id = album.id;
    this.name = album.name;
    this.type = new LabelValueRO(album.typeLabelValue);
    this.cover = album.cover ? `${process.env.CLIENT_API_URL}${album.cover}` : null;
    this.color = album.color;
    this.releaseAt = album.releaseAt;
  }
}
