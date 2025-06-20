import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  NotFoundException,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import {
  ApiBody,
  ApiCreatedResponse,
  ApiNoContentResponse,
  ApiOkResponse,
  ApiOperation,
  ApiParam,
  ApiTags,
} from '@nestjs/swagger';
import { faker } from '@faker-js/faker';
import { CommandBus, QueryBus } from '@nestjs/cqrs';
import { CreateTrackDTO } from './dtos/create-track.dto';
import { UpdateTrackFileDTO } from './dtos/update-track-file.dto';
import { TrackRO } from './ros/track.ro';
import { BadRequestException } from '../../../../../core/shared/exceptions';
import { UpdateTrackDTO } from './dtos/update-track.dto';
import { ParseObjectIdPipe } from '../../../common/pipes/parse-object-id.pipe';
import { UpdateTrackFeatArtistsDTO } from './dtos/update-track-feat-artists.dto';
import { CreateTrackCommand } from '../../../../../core/app/cqrs/track/commands/create-track/create-track.command';
import { GetTrackQuery } from '../../../../../core/app/cqrs/track/queries/get-track/get-track.query';
import { UpdateTrackCommand } from '../../../../../core/app/cqrs/track/commands/update-track/update-track.command';
import { UpdateTrackFeatArtistsCommand } from '../../../../../core/app/cqrs/track/commands/update-track-feat-artists/update-track-feat-artists.command';
import { UpdateTrackFileCommand } from '../../../../../core/app/cqrs/track/commands/update-track-file/update-track-file.command';
import { DeleteTrackFileCommand } from '../../../../../core/app/cqrs/track/commands/delete-track-file/delete-track-file.command';
import { DeleteTrackCommand } from '../../../../../core/app/cqrs/track/commands/delete-track/delete-track.command';
import { Roles } from '../../decorators/roles.decorator';
import { AdminRoles } from '../../../../../core/domain/components/admin/constants/admin-roles';

@ApiTags('Tracks')
@Roles(AdminRoles.Owner, AdminRoles.Admin)
@Controller({ path: '/tracks' })
export class TracksController {
  constructor(
    private readonly _commandBus: CommandBus,
    private readonly _queryBus: QueryBus,
  ) {}

  @ApiOperation({ summary: 'Create an track', operationId: 'createTrack' })
  @ApiBody({ type: CreateTrackDTO })
  @ApiCreatedResponse({ description: 'Track', type: TrackRO })
  @Post('/')
  async createTrack(@Body() { albumId }: CreateTrackDTO): Promise<TrackRO> {
    const createdTrackId = await this._commandBus.execute(new CreateTrackCommand(albumId));
    const createdTrack = await this._queryBus.execute(new GetTrackQuery(createdTrackId));

    if (!createdTrack) {
      throw new BadRequestException('Some error');
    }

    return new TrackRO(createdTrack);
  }

  @ApiOperation({ summary: 'Update track data', operationId: 'updateTrack' })
  @ApiParam({
    type: String,
    name: 'id',
    description: 'Id',
    example: faker.database.mongodbObjectId(),
  })
  @ApiBody({ type: UpdateTrackDTO })
  @ApiOkResponse({ description: 'Updated artist', type: TrackRO })
  @Patch('/:id')
  async updateTrack(
    @Param('id', ParseObjectIdPipe) id: string,
    @Body() dto: UpdateTrackDTO,
  ): Promise<TrackRO> {
    await this._commandBus.execute(new UpdateTrackCommand(id, dto));

    const updatedTrack = await this._queryBus.execute(new GetTrackQuery(id));

    if (!updatedTrack) {
      throw new NotFoundException('Track does not exist');
    }

    return new TrackRO(updatedTrack);
  }

  @ApiOperation({ summary: 'Update track feat. artists', operationId: 'updateTrackFeatArtists' })
  @ApiParam({
    type: String,
    name: 'id',
    description: 'Id',
    example: faker.database.mongodbObjectId(),
  })
  @ApiBody({ type: UpdateTrackFeatArtistsDTO })
  @ApiOkResponse({ description: 'Updated artist', type: TrackRO })
  @Patch('/:id/featured-artists')
  async updateTrackFeatArtists(
    @Param('id', ParseObjectIdPipe) id: string,
    @Body() dto: UpdateTrackFeatArtistsDTO,
  ): Promise<TrackRO> {
    await this._commandBus.execute(new UpdateTrackFeatArtistsCommand(id, dto.artists));

    const updatedTrack = await this._queryBus.execute(new GetTrackQuery(id));

    if (!updatedTrack) {
      throw new NotFoundException('Track does not exist');
    }

    return new TrackRO(updatedTrack);
  }

  @ApiOperation({ summary: 'Update track file', operationId: 'updateTrackFile' })
  @ApiParam({
    type: String,
    name: 'id',
    description: 'Id',
    example: faker.database.mongodbObjectId(),
  })
  @ApiBody({ type: UpdateTrackFileDTO })
  @ApiOkResponse({ description: 'Updated artist', type: TrackRO })
  @Patch('/:id/file')
  async updateTrackFile(
    @Param('id', ParseObjectIdPipe) id: string,
    @Body() dto: UpdateTrackFileDTO,
  ): Promise<TrackRO> {
    await this._commandBus.execute(new UpdateTrackFileCommand(id, dto));

    const updatedTrack = await this._queryBus.execute(new GetTrackQuery(id));

    if (!updatedTrack) {
      throw new NotFoundException('Track does not exist');
    }

    return new TrackRO(updatedTrack);
  }

  @ApiOperation({ summary: 'Delete track file', operationId: 'deleteTrackFile' })
  @ApiParam({
    type: String,
    name: 'id',
    description: 'Id',
    example: faker.database.mongodbObjectId(),
  })
  @ApiOkResponse({ description: 'Updated artist', type: TrackRO })
  @Delete('/:id/file')
  async deleteTrackFile(@Param('id', ParseObjectIdPipe) id: string): Promise<TrackRO> {
    await this._commandBus.execute(new DeleteTrackFileCommand(id));

    const updatedTrack = await this._queryBus.execute(new GetTrackQuery(id));

    if (!updatedTrack) {
      throw new NotFoundException('Track does not exist');
    }

    return new TrackRO(updatedTrack);
  }

  @ApiOperation({ summary: 'Delete an track by id', operationId: 'deleteTrack' })
  @ApiParam({
    type: String,
    name: 'id',
    description: 'Id',
    example: faker.database.mongodbObjectId(),
  })
  @ApiNoContentResponse({ description: 'TrackEntity has been deleted', schema: { format: 'json' } })
  @HttpCode(HttpStatus.NO_CONTENT)
  @Delete('/:id')
  async deleteTrack(@Param('id', ParseObjectIdPipe) id: string): Promise<void> {
    await this._commandBus.execute(new DeleteTrackCommand(id));
  }

  @ApiOperation({ summary: 'Get an track by id', operationId: 'getTrack' })
  @ApiParam({
    type: String,
    name: 'id',
    description: 'Id',
    example: faker.database.mongodbObjectId(),
  })
  @ApiOkResponse({ description: 'Track', type: TrackRO })
  @Roles(AdminRoles.Guest)
  @Get('/:id')
  async getTrack(@Param('id', ParseObjectIdPipe) id: string): Promise<TrackRO> {
    const foundTrack = await this._queryBus.execute(new GetTrackQuery(id));

    if (!foundTrack) {
      throw new NotFoundException('Track does not exist');
    }

    return new TrackRO(foundTrack);
  }
}
