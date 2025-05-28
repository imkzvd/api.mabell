import {
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  Post,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import {
  ApiBody,
  ApiNoContentResponse,
  ApiOkResponse,
  ApiOperation,
  ApiParam,
  ApiTags,
} from '@nestjs/swagger';
import { FileInterceptor } from '@nestjs/platform-express';
import { CommandBus, QueryBus } from '@nestjs/cqrs';
import { faker } from '@faker-js/faker';
import { UploadFileDTO } from './dtos/upload-file.dto';
import { TmpFileRO } from './ros/tmp-file.ro';
import { UploadFileCommand } from '../../../../../core/app/components/upload/commands/upload-file/upload-file.command';
import { GetFileQuery } from '../../../../../core/app/components/upload/queries/get-file/get-file.query';
import { BadRequestException } from '../../../../../core/shared/exceptions';
import { DeleteFileCommand } from '../../../../../core/app/components/upload/commands/delete-file/delete-file.command';
import { DeleteAllFilesCommand } from '../../../../../core/app/components/upload/commands/delete-all-files/delete-all-files.command';

@ApiTags('Uploads')
@Controller('/uploads')
export class UploadsController {
  constructor(
    private readonly _commandBus: CommandBus,
    private readonly _queryBus: QueryBus,
  ) {}

  @ApiOperation({ summary: 'Upload file', operationId: 'upload' })
  @ApiBody({ type: UploadFileDTO })
  @ApiOkResponse({ description: 'Uploaded file', type: TmpFileRO })
  @UseInterceptors(FileInterceptor('file'))
  @Post('/')
  async upload(@UploadedFile() file: Express.Multer.File): Promise<TmpFileRO> {
    const uploadedFileId = await this._commandBus.execute(new UploadFileCommand(file));

    const fileData = await this._queryBus.execute(new GetFileQuery(uploadedFileId));

    if (!fileData) {
      throw new BadRequestException('The file has not been uploaded');
    }

    return new TmpFileRO(fileData);
  }

  @ApiOperation({ summary: 'Delete tmp file by id', operationId: 'delete' })
  @ApiParam({
    type: String,
    name: 'id',
    description: 'Admin id',
    example: faker.database.mongodbObjectId(),
  })
  @ApiNoContentResponse({
    description: 'Tmp file has been deleted',
    schema: { format: 'json' },
  })
  @HttpCode(HttpStatus.NO_CONTENT)
  @Delete('/:id')
  async delete(@Param('id') id: string): Promise<void> {
    await this._commandBus.execute(new DeleteFileCommand(id));
  }

  @ApiOperation({ summary: 'Delete all tmp file', operationId: 'deleteAll' })
  @ApiNoContentResponse({
    description: 'Tmp files has been deleted',
    schema: { format: 'json' },
  })
  @HttpCode(HttpStatus.NO_CONTENT)
  @Delete('/')
  async deleteAll(): Promise<void> {
    return this._commandBus.execute(new DeleteAllFilesCommand());
  }

  @ApiOperation({ summary: 'Find uploaded file by id', operationId: 'findOne' })
  @ApiOkResponse({ description: 'Uploaded file', type: TmpFileRO })
  @ApiParam({
    type: String,
    name: 'id',
    description: 'Admin id',
    example: faker.database.mongodbObjectId(),
  })
  @Get('/:id')
  async findOne(@Param('id') id: string): Promise<TmpFileRO> {
    const fileData = await this._queryBus.execute(new GetFileQuery(id));

    if (!fileData) {
      throw new BadRequestException('The file has not been uploaded');
    }

    return new TmpFileRO(fileData);
  }
}
