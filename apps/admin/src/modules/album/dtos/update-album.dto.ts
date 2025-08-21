import { ApiProperty } from '@nestjs/swagger';
import { faker } from '@faker-js/faker';
import {
  IsBoolean,
  IsEnum,
  IsISO8601,
  IsNotEmpty,
  IsOptional,
  IsString,
  MaxLength,
  MinLength,
} from 'class-validator';
import { Domain } from '@api.mabell/core';

export class UpdateAlbumDTO {
  @ApiProperty({
    required: false,
    type: String,
    description: 'Name',
    example: faker.music.songName(),
  })
  @MinLength(1)
  @MaxLength(30)
  @IsNotEmpty()
  @IsString()
  @IsOptional()
  name?: string;

  @ApiProperty({
    required: false,
    type: String,
    description: 'Type',
    example: Domain.Album.AlbumTypes.Album,
  })
  @IsEnum(Domain.Album.AlbumTypes)
  @IsOptional()
  type?: Domain.Album.AlbumType;

  @ApiProperty({
    required: false,
    type: [String],
    description: 'Favorite genres',
    example: [Domain.Common.Genres['Hip-Hop']],
  })
  @IsEnum(Domain.Common.Genres, { each: true })
  @IsOptional()
  genres?: Domain.Common.Genre[];

  @ApiProperty({
    required: false,
    type: String,
    description: 'Description',
    example: faker.lorem.text(),
  })
  @IsString()
  @IsOptional()
  description?: string;

  @ApiProperty({
    required: false,
    type: Date,
    description: 'Release date',
    example: faker.date.past().toISOString(),
    nullable: true,
  })
  @IsISO8601()
  @IsOptional()
  releaseAt?: Date | null;

  @ApiProperty({
    required: false,
    type: Boolean,
    description: 'Active',
    example: true,
  })
  @IsBoolean()
  @IsOptional()
  isActive?: boolean;

  @ApiProperty({
    required: false,
    type: Boolean,
    description: 'Public',
    example: true,
  })
  @IsBoolean()
  @IsOptional()
  isPublic?: boolean;
}
