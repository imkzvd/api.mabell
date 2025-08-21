import { ApiProperty } from '@nestjs/swagger';
import { faker } from '@faker-js/faker';
import * as process from 'process';
import { LabelValueRO } from '@api.mabell/shared';
import { App } from '@api.mabell/core';

export class UserRO {
  @ApiProperty({
    type: String,
    description: 'Id',
    example: faker.database.mongodbObjectId(),
  })
  id: string;

  @ApiProperty({
    type: String,
    description: 'Username',
    example: faker.internet.username(),
  })
  username: string;

  @ApiProperty({
    type: String,
    description: 'Birth name',
    example: faker.person.firstName(),
  })
  name: string;

  @ApiProperty({
    type: String,
    description: 'Email',
    example: faker.internet.email(),
    nullable: true,
  })
  email: string | null;

  @ApiProperty({
    type: Date,
    description: 'Birth date',
    example: faker.date.birthdate(),
    nullable: true,
  })
  birthDate: Date | null;

  @ApiProperty({ type: () => LabelValueRO, description: 'Region' })
  region: LabelValueRO;

  @ApiProperty({ type: () => [LabelValueRO], description: 'Favorite genres' })
  genres: LabelValueRO[];

  @ApiProperty({
    type: String,
    description: 'Avatar URL',
    example: `${process.env.API_URL}/${faker.system.commonFileName('webp')}`,
    nullable: true,
  })
  avatar: string | null;

  @ApiProperty({
    type: String,
    description: 'Accent color',
    example: faker.color.rgb(),
    nullable: true,
  })
  color: string | null;

  @ApiProperty({ type: Boolean, description: 'Block', example: false })
  isBlocked: boolean;

  @ApiProperty({ type: Boolean, description: 'Verification', example: false })
  isVerified: boolean;

  @ApiProperty({
    type: Boolean,
    description: 'Public',
    example: false,
  })
  isPublic: boolean;

  @ApiProperty({ type: Boolean, description: 'Premium', example: false })
  isPremium: boolean;

  @ApiProperty({
    type: Date,
    description: 'Reg. date',
    example: faker.date.anytime(),
  })
  createdAt: Date;

  @ApiProperty({
    type: Date,
    description: 'Update date',
    example: faker.date.anytime(),
  })
  updatedAt: Date;

  constructor(dto: App.DTOs.UserDTO) {
    this.id = dto.id;
    this.username = dto.username;
    this.name = dto.name;
    this.email = dto.email;
    this.birthDate = dto.birthDate;
    this.region = new LabelValueRO(dto.regionLabelValue);
    this.genres = dto.genreLabelValues.map((i) => new LabelValueRO(i));
    this.avatar = dto.avatar ? `${process.env.API_URL}${dto.avatar}` : null;
    this.color = dto.color;
    this.isBlocked = dto.isBlocked;
    this.isVerified = dto.isVerified;
    this.isPublic = dto.isPublic;
    this.isPremium = dto.isPremium;
    this.createdAt = dto.createdAt;
    this.updatedAt = dto.updatedAt;
  }
}
