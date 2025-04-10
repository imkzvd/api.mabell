import { ApiProperty } from '@nestjs/swagger';
import { faker } from '@faker-js/faker';
import {
  IsBoolean,
  IsEnum,
  IsISO8601,
  IsNotEmpty,
  IsOptional,
  IsString,
  MinLength,
} from 'class-validator';
import {
  AlbumType,
  AlbumTypes,
} from '../../../../../../core/domain/components/album/constants/album-types';
import { Genre, Genres } from '../../../../../../core/domain/common/constants/genres';

export class UpdateAlbumDTO {
  @ApiProperty({
    required: false,
    type: String,
    description: 'Name',
    example: faker.music.songName(),
  })
  @MinLength(1)
  @IsNotEmpty()
  @IsString()
  @IsOptional()
  name?: string;

  @ApiProperty({
    required: false,
    type: String,
    description: 'Type',
    example: AlbumTypes.Album,
  })
  @IsEnum(AlbumTypes)
  @IsOptional()
  type?: AlbumType;

  @ApiProperty({
    required: false,
    type: [String],
    description: 'Favorite genres',
    example: [Genres['Hip-Hop']],
  })
  @IsEnum(Genres, { each: true })
  @IsOptional()
  genres?: Genre[];

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
  })
  @IsISO8601()
  @IsOptional()
  releaseAt?: Date;

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
