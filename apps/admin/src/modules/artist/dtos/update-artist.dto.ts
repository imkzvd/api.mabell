import { ApiProperty } from '@nestjs/swagger';
import { faker } from '@faker-js/faker';
import {
  IsBoolean,
  IsEnum,
  IsISO8601,
  IsOptional,
  IsString,
  MaxLength,
  MinLength,
} from 'class-validator';
import { Domain } from '@api.mabell/core';

export class UpdateArtistDTO {
  @ApiProperty({
    required: false,
    type: String,
    description: 'Name',
    example: faker.person.firstName(),
  })
  @MinLength(3)
  @MaxLength(30)
  @IsString()
  @IsOptional()
  name?: string;

  @ApiProperty({
    required: false,
    type: String,
    description: 'Birth name',
    example: faker.person.fullName(),
    nullable: true,
  })
  @MinLength(10)
  @MaxLength(100)
  @IsString()
  @IsOptional()
  birthName?: string | null;

  @ApiProperty({
    required: false,
    type: Date,
    description: 'Birth date',
    example: faker.date.past().toISOString(),
    nullable: true,
  })
  @IsISO8601()
  @IsOptional()
  birthDate?: Date | null;

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
    description: 'Biography',
    example: faker.person.bio(),
  })
  @IsString()
  @IsOptional()
  biography?: string;

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
