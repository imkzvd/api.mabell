import { ApiProperty } from '@nestjs/swagger';
import { faker } from '@faker-js/faker';
import { IsNotEmpty, IsOptional } from 'class-validator';

export class UpdateArtistImageDTO {
  @ApiProperty({
    required: true,
    type: String,
    description: 'Id of the uploaded file',
    example: faker.image.url(),
  })
  @IsNotEmpty()
  fileId: string;

  @ApiProperty({
    required: false,
    type: String,
    description: 'Color',
    example: faker.color.rgb(),
    nullable: true,
  })
  @IsNotEmpty()
  @IsOptional()
  color?: string | null;
}
