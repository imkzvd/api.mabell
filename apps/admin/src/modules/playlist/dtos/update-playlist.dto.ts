import { ApiProperty } from '@nestjs/swagger';
import { faker } from '@faker-js/faker';
import { IsBoolean, IsEnum, IsNotEmpty, IsOptional, IsString, MinLength } from 'class-validator';
import { Domain } from '@api.mabell/core';

export class UpdatePlaylistDTO {
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
    type: [String],
    description: 'Genres',
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
    type: Boolean,
    description: 'Public',
    example: true,
  })
  @IsBoolean()
  @IsOptional()
  isPublic?: boolean;
}
