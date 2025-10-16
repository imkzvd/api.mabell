import { ApiProperty } from '@nestjs/swagger';
import { faker } from '@faker-js/faker';
import * as process from 'process';
import { LabelValueRO } from '@api.mabell/shared';
import { App } from '@api.mabell/core';

export class ArtistRO {
  @ApiProperty({
    type: String,
    description: 'Id',
    example: faker.database.mongodbObjectId(),
  })
  id: string;

  @ApiProperty({
    type: String,
    description: 'Name',
    example: faker.person.firstName(),
  })
  name: string;

  @ApiProperty({
    type: String,
    description: 'Birth name',
    example: faker.person.fullName(),
    nullable: true,
  })
  birthName: string | null;

  @ApiProperty({
    type: Date,
    description: 'Birth date',
    example: faker.date.past().toISOString(),
    nullable: true,
  })
  birthDate: Date | null;

  @ApiProperty({
    type: () => [LabelValueRO],
    description: 'Genres',
  })
  genres: LabelValueRO[];

  @ApiProperty({
    type: String,
    description: 'Biography',
    example: faker.person.bio(),
  })
  biography: string;

  @ApiProperty({
    type: String,
    description: 'Avatar URL',
    example: `${process.env.ADMIN_API_URL}/${faker.system.commonFileName('webp')}`,
    nullable: true,
  })
  avatar: string | null;

  @ApiProperty({
    type: String,
    description: 'Cover URL',
    example: `${process.env.ADMIN_API_URL}/${faker.system.commonFileName('webp')}`,
    nullable: true,
  })
  cover: string | null;

  @ApiProperty({
    type: String,
    description: 'Accent color',
    example: faker.color.rgb(),
    nullable: true,
  })
  accentColor: string | null;

  @ApiProperty({
    type: String,
    description: 'Secondary color',
    example: faker.color.rgb(),
    nullable: true,
  })
  secondaryColor: string | null;

  @ApiProperty({ type: Boolean, description: 'Activation', example: true })
  isActive: boolean;

  @ApiProperty({ type: Boolean, description: 'Public', example: true })
  isPublic: boolean;

  @ApiProperty({
    type: Date,
    description: 'Created date',
    example: faker.date.past().toISOString(),
  })
  createdAt: Date;

  @ApiProperty({
    type: Date,
    description: 'Updated date',
    example: faker.date.past().toISOString(),
  })
  updatedAt: Date;

  constructor(dto: App.DTOs.ArtistDTO) {
    this.id = dto.id;
    this.name = dto.name;
    this.birthName = dto.birthName;
    this.birthDate = dto.birthDate;
    this.genres = dto.genreLabelValues.map((i) => new LabelValueRO(i));
    this.biography = dto.biography;
    this.avatar = dto.avatar ? `${process.env.ADMIN_API_URL}${dto.avatar}` : null;
    this.cover = dto.cover ? `${process.env.ADMIN_API_URL}${dto.cover}` : null;
    this.accentColor = dto.accentColor;
    this.secondaryColor = dto.secondaryColor;
    this.isActive = dto.isActive;
    this.isPublic = dto.isPublic;
    this.createdAt = dto.createdAt;
    this.updatedAt = dto.updatedAt;
  }
}
