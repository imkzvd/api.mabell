import { ApiProperty } from '@nestjs/swagger';
import {
  IsBoolean,
  IsDateString,
  IsEnum,
  IsISO31661Alpha3,
  IsNotEmpty,
  IsOptional,
  IsString,
  MinLength,
} from 'class-validator';
import { faker } from '@faker-js/faker';
import { Domain } from '@api.mabell/core';

export class UpdateUserDTO {
  @ApiProperty({
    required: false,
    type: String,
    description: 'Birth name',
    example: faker.person.firstName(),
  })
  @IsNotEmpty()
  @IsString()
  @MinLength(1)
  @IsOptional()
  name?: string;

  @ApiProperty({
    required: false,
    type: Date,
    description: 'Birth date',
    example: faker.date.birthdate(),
    nullable: true,
  })
  @IsDateString()
  @IsNotEmpty()
  @IsOptional()
  birthDate?: Date | null;

  @ApiProperty({
    required: false,
    type: String,
    description: 'Region',
    example: Domain.Common.Regions['Russian Federation'],
  })
  @IsEnum(Domain.Common.Regions)
  @IsISO31661Alpha3()
  @IsOptional()
  region?: Domain.Common.Region;

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
    type: Boolean,
    description: 'Premium',
    example: false,
  })
  @IsBoolean()
  @IsOptional()
  isPremium?: boolean;

  @ApiProperty({
    required: false,
    type: Boolean,
    description: 'Block',
    example: false,
  })
  @IsBoolean()
  @IsOptional()
  isBlocked?: boolean;
}
