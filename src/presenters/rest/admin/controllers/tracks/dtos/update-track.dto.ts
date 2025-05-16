import { ApiProperty } from '@nestjs/swagger';
import { faker } from '@faker-js/faker';
import { IsBoolean, IsOptional, IsString } from 'class-validator';

export class UpdateTrackDTO {
  @ApiProperty({
    required: false,
    type: String,
    description: 'Name',
    example: faker.music.songName(),
  })
  @IsString()
  @IsOptional()
  name?: string;

  @ApiProperty({
    required: false,
    type: Boolean,
    description: 'Explicit',
    example: true,
  })
  @IsBoolean()
  @IsOptional()
  isExplicit?: boolean;

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
