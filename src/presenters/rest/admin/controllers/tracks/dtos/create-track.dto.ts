import { ApiProperty } from '@nestjs/swagger';
import { IsMongoId, IsOptional, IsString } from 'class-validator';
import { faker } from '@faker-js/faker';

export class CreateTrackDTO {
  @ApiProperty({
    required: true,
    type: String,
    description: 'Id of the album',
    example: faker.database.mongodbObjectId(),
  })
  @IsMongoId()
  albumId: string;

  @ApiProperty({
    required: false,
    type: String,
    description: 'Name',
    example: faker.music.songName(),
  })
  @IsString()
  @IsOptional()
  name?: string;
}
