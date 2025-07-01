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
import { Region, Regions } from '@core/domain/common/constants/regions';
import { Genre, Genres } from '@core/domain/common/constants/genres';

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
  })
  @IsDateString()
  @IsNotEmpty()
  @IsOptional()
  birthDate?: Date;

  @ApiProperty({
    required: false,
    type: String,
    description: 'Region',
    example: Regions['Russian Federation'],
  })
  @IsEnum(Regions)
  @IsISO31661Alpha3()
  @IsOptional()
  region?: Region;

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

  @ApiProperty({
    required: false,
    type: Boolean,
    description: 'Public',
    example: false,
  })
  @IsBoolean()
  @IsOptional()
  isPublic?: boolean;
}
