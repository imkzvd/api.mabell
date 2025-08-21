import {
  BadRequestException,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  NotFoundException,
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
import { faker } from '@faker-js/faker';
import { Domain, App } from '@api.mabell/core';
import { CommandBus, QueryBus } from '@api.mabell/cqrs';
import { UploadFileDTO } from './dtos/upload-file.dto';
import { TmpFileRO } from './ros/tmp-file.ro';
import { Roles } from '../../decorators/roles.decorator';

@ApiTags('Upload')
@Roles(Domain.Admin.AdminRoles.Owner, Domain.Admin.AdminRoles.Admin)
@Controller('/uploads')
export class UploadController {
  constructor(
    private readonly _commandBus: CommandBus,
    private readonly _queryBus: QueryBus,
  ) {}

  @ApiOperation({ summary: 'Upload file', operationId: 'uploadFile' })
  @ApiBody({ type: UploadFileDTO })
  @ApiOkResponse({ description: 'Uploaded file', type: TmpFileRO })
  @UseInterceptors(FileInterceptor('file'))
  @Post('/')
  async uploadFile(@UploadedFile() file: Express.Multer.File): Promise<TmpFileRO> {
    const { id: uploadedFileId } = await this._commandBus.execute(
      new App.CQRS.UploadFileCommand({ file }),
    );

    const fileData = await this._queryBus.execute(new App.CQRS.GetFileQuery(uploadedFileId));

    if (!fileData) {
      throw new BadRequestException('The file has not been uploaded');
    }

    return new TmpFileRO(fileData);
  }

  @ApiOperation({ summary: 'Delete tmp file by id', operationId: 'deleteFile' })
  @ApiParam({
    type: String,
    name: 'id',
    description: 'Admin id',
    example: faker.database.mongodbObjectId(),
  })
  @ApiNoContentResponse({ description: 'Tmp file has been deleted', schema: { format: 'json' } })
  @HttpCode(HttpStatus.NO_CONTENT)
  @Delete('/:id')
  async deleteFile(@Param('id') id: string): Promise<void> {
    await this._commandBus.execute(new App.CQRS.DeleteFileCommand(id));
  }

  @ApiOperation({ summary: 'Delete all tmp file', operationId: 'deleteAllFiles' })
  @ApiNoContentResponse({ description: 'Tmp files has been deleted', schema: { format: 'json' } })
  @HttpCode(HttpStatus.NO_CONTENT)
  @Delete('/')
  async deleteAllFiles(): Promise<void> {
    return this._commandBus.execute(new App.CQRS.DeleteAllFilesCommand());
  }

  @ApiOperation({ summary: 'Get uploaded file by id', operationId: 'getFile' })
  @ApiOkResponse({ description: 'Uploaded file', type: TmpFileRO })
  @ApiParam({
    type: String,
    name: 'id',
    description: 'Admin id',
    example: faker.database.mongodbObjectId(),
  })
  @Get('/:id')
  async getFile(@Param('id') id: string): Promise<TmpFileRO> {
    const fileData = await this._queryBus.execute(new App.CQRS.GetFileQuery(id));

    if (!fileData) {
      throw new NotFoundException('The file does not exist');
    }

    return new TmpFileRO(fileData);
  }
}
