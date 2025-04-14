import { ApiProperty } from '@nestjs/swagger';
import { IsNumber, IsString } from 'class-validator';

export class UpdateTrackFileDTO {
  @ApiProperty({
    required: true,
    type: String,
    description: 'Uploaded file id',
  })
  @IsString()
  fileId: string;

  @ApiProperty({
    required: true,
    type: Number,
    description: 'Duration',
    example: 240,
  })
  @IsNumber()
  duration: number;
}
