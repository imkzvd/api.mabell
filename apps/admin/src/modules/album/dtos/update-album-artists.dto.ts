import { ApiProperty } from '@nestjs/swagger';
import { faker } from '@faker-js/faker';
import { ArrayMinSize, IsArray, IsMongoId } from 'class-validator';

export class UpdateAlbumArtistsDTO {
  @ApiProperty({
    required: true,
    type: [String],
    description: 'Artist ids',
    example: [faker.database.mongodbObjectId()],
  })
  @IsMongoId({ each: true })
  @ArrayMinSize(1)
  @IsArray()
  artists: string[];
}
