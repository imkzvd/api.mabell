import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';

export class UploadFileDTO {
  @ApiProperty({
    required: true,
    description: 'File',
    type: 'string',
    format: 'binary',
  })
  @IsNotEmpty()
  public readonly file: any;
}
