import {
  Body,
  Controller,
  DefaultValuePipe,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  NotFoundException,
  Param,
  ParseIntPipe,
  Patch,
  Post,
  Query,
} from '@nestjs/common';
import {
  ApiBody,
  ApiCreatedResponse,
  ApiNoContentResponse,
  ApiOkResponse,
  ApiOperation,
  ApiParam,
  ApiQuery,
  ApiTags,
} from '@nestjs/swagger';
import { faker } from '@faker-js/faker';
import { CommandBus, QueryBus } from '@nestjs/cqrs';
import { ParseObjectIdPipe } from '../../../common/pipes/parse-object-id.pipe';
import { UpdateAlbumDTO } from './dtos/update-album.dto';
import { AlbumRO } from './ros/album.ro';
import { GetAlbumQuery } from '../../../../../core/app/components/album/queries/get-album/get-album.query';
import { UpdateAlbumArtistsDTO } from './dtos/update-album-artists.dto';
import { UpdateAlbumCommand } from '../../../../../core/app/components/album/commands/update-album/update-album.command';
import { UpdateAlbumArtistsCommand } from '../../../../../core/app/components/album/commands/update-album-artists/update-album-artists.command';
import { UpdateAlbumCoverDTO } from './dtos/update-album-cover.dto';
import { UpdateAlbumCoverCommand } from '../../../../../core/app/components/album/commands/update-album-cover/update-album-cover.command';
import { DeleteAlbumCoverCommand } from '../../../../../core/app/components/album/commands/delete-album-cover/delete-album-cover.command';
import { DeleteAlbumCommand } from '../../../../../core/app/components/album/commands/delete-album/delete-album.command';
import { BadRequestException } from '../../../../../core/shared/exceptions';
import { CreateAlbumDTO } from './dtos/create-album.dto';
import { CreateAlbumCommand } from '../../../../../core/app/components/album/commands/create-album/create-album.command';
import { GetAlbumTracksQuery } from '../../../../../core/app/components/track/queries/get-album-tracks/get-album-tracks.query';
import { TracksRO } from '../tracks/ros/tracks.ro';

@ApiTags('Albums')
@Controller({ path: '/albums' })
export class AlbumsController {
  constructor(
    private readonly _commandBus: CommandBus,
    private readonly _queryBus: QueryBus,
  ) {}

  @ApiOperation({ summary: 'Create an album', operationId: 'create' })
  @ApiBody({ type: CreateAlbumDTO })
  @ApiCreatedResponse({ description: 'Album', type: AlbumRO })
  @Post('/')
  async create(@Body() { artist }: CreateAlbumDTO): Promise<AlbumRO> {
    const createdAlbumId = await this._commandBus.execute(new CreateAlbumCommand(artist));
    const createdAlbum = await this._queryBus.execute(new GetAlbumQuery(createdAlbumId));

    if (!createdAlbum) {
      throw new BadRequestException('Some error');
    }

    return new AlbumRO(createdAlbum);
  }

  @ApiOperation({
    summary: 'Update album data',
    operationId: 'update',
  })
  @ApiParam({
    type: String,
    name: 'id',
    description: 'Id',
    example: faker.database.mongodbObjectId(),
  })
  @ApiBody({ type: UpdateAlbumDTO })
  @ApiOkResponse({ description: 'Album', type: AlbumRO })
  @Patch('/:id')
  async update(
    @Param('id', ParseObjectIdPipe) id: string,
    @Body() dto: UpdateAlbumDTO,
  ): Promise<AlbumRO> {
    await this._commandBus.execute(new UpdateAlbumCommand(id, dto));

    const updatedAlbum = await this._queryBus.execute(new GetAlbumQuery(id));

    if (!updatedAlbum) {
      throw new NotFoundException('Album not found');
    }

    return new AlbumRO(updatedAlbum);
  }

  @ApiOperation({
    summary: 'Update artists of the album',
    operationId: 'updateArtists',
  })
  @ApiParam({
    type: String,
    name: 'id',
    description: 'Id',
    example: faker.database.mongodbObjectId(),
  })
  @ApiBody({ type: UpdateAlbumArtistsDTO })
  @ApiOkResponse({ description: 'Album', type: AlbumRO })
  @Patch('/:id/artists')
  async updateArtists(
    @Param('id', ParseObjectIdPipe) id: string,
    @Body() dto: UpdateAlbumArtistsDTO,
  ): Promise<AlbumRO> {
    await this._commandBus.execute(new UpdateAlbumArtistsCommand(id, dto.artists));

    const updatedAlbum = await this._queryBus.execute(new GetAlbumQuery(id));

    if (!updatedAlbum) {
      throw new NotFoundException('Album not found');
    }

    return new AlbumRO(updatedAlbum);
  }

  @ApiOperation({
    summary: 'Update cover of the album',
    operationId: 'updateCover',
  })
  @ApiParam({
    type: String,
    name: 'id',
    description: 'Id',
    example: faker.database.mongodbObjectId(),
  })
  @ApiBody({ type: UpdateAlbumCoverDTO })
  @ApiOkResponse({ description: 'Album', type: AlbumRO })
  @Patch('/:id/cover')
  async updateCover(
    @Param('id', ParseObjectIdPipe) id: string,
    @Body() dto: UpdateAlbumCoverDTO,
  ): Promise<AlbumRO> {
    await this._commandBus.execute(new UpdateAlbumCoverCommand(id, dto));

    const updatedAlbum = await this._queryBus.execute(new GetAlbumQuery(id));

    if (!updatedAlbum) {
      throw new NotFoundException('Album not found');
    }

    return new AlbumRO(updatedAlbum);
  }

  @ApiOperation({
    summary: 'Delete cover of the album',
    operationId: 'deleteCover',
  })
  @ApiParam({
    type: String,
    name: 'id',
    description: 'Id',
    example: faker.database.mongodbObjectId(),
  })
  @ApiOkResponse({ description: 'Album', type: AlbumRO })
  @Delete('/:id/cover')
  async deleteCover(@Param('id', ParseObjectIdPipe) id: string): Promise<AlbumRO> {
    await this._commandBus.execute(new DeleteAlbumCoverCommand(id));

    const updatedAlbum = await this._queryBus.execute(new GetAlbumQuery(id));

    if (!updatedAlbum) {
      throw new NotFoundException('Album not found');
    }

    return new AlbumRO(updatedAlbum);
  }

  @ApiOperation({
    summary: 'Delete an album by id',
    operationId: 'delete',
  })
  @ApiParam({
    type: String,
    name: 'id',
    description: 'Id',
    example: faker.database.mongodbObjectId(),
  })
  @ApiNoContentResponse({
    description: 'Album has been deleted',
    schema: { format: 'json' },
  })
  @HttpCode(HttpStatus.NO_CONTENT)
  @Delete('/:id')
  async delete(@Param('id', ParseObjectIdPipe) id: string): Promise<void> {
    await this._commandBus.execute(new DeleteAlbumCommand(id));
  }

  @ApiOperation({ summary: 'Find an album by id', operationId: 'findOne' })
  @ApiParam({
    type: String,
    name: 'id',
    description: 'Id',
    example: faker.database.mongodbObjectId(),
  })
  @ApiOkResponse({ description: 'Album', type: AlbumRO })
  @Get('/:id')
  async findOne(@Param('id', ParseObjectIdPipe) id: string): Promise<AlbumRO> {
    const foundAlbum = await this._queryBus.execute(new GetAlbumQuery(id));

    if (!foundAlbum) {
      throw new NotFoundException(`There is no album with the specified ID`);
    }

    const foundTracks = await this._queryBus.execute(new GetAlbumTracksQuery(id));

    return new AlbumRO(foundAlbum, foundTracks);
  }

  @ApiOperation({ summary: 'Get album tracks', operationId: 'getTracks' })
  @ApiParam({
    type: String,
    name: 'id',
    description: 'Id',
    example: faker.database.mongodbObjectId(),
  })
  @ApiQuery({
    required: false,
    type: Number,
    name: 'limit',
    description: 'Limit',
    example: 50,
  })
  @ApiQuery({
    required: false,
    type: Number,
    name: 'offset',
    description: 'Offset',
    example: 0,
  })
  @ApiOkResponse({ description: 'Album tracks', type: TracksRO })
  @Get('/:id/tracks')
  async getTracks(
    @Param('id', ParseObjectIdPipe) id: string,
    @Query('limit', new DefaultValuePipe(50), ParseIntPipe) limit: number,
    @Query('offset', new DefaultValuePipe(0), ParseIntPipe) offset: number,
  ): Promise<TracksRO> {
    const foundTracks = await this._queryBus.execute(
      new GetAlbumTracksQuery(id, { pagination: { limit, offset } }),
    );

    return new TracksRO(foundTracks);
  }
}
