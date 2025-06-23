import { ApiProperty } from '@nestjs/swagger';
import { faker } from '@faker-js/faker';
import { IsArray, IsMongoId } from 'class-validator';

export class UpdateTrackFeatArtistsDTO {
  @ApiProperty({
    required: true,
    type: [String],
    description: 'Artist ids',
    example: [faker.database.mongodbObjectId()],
  })
  @IsMongoId({ each: true })
  @IsArray()
  artists: string[];
}
