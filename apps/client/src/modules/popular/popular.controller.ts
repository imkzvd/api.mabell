import {
  Controller,
  DefaultValuePipe,
  Get,
  ParseArrayPipe,
  ParseIntPipe,
  Query,
} from '@nestjs/common';
import { ApiOkResponse, ApiOperation, ApiQuery, ApiTags } from '@nestjs/swagger';
import { QueryBus } from '@api.mabell/cqrs';
import { App, Shared, Domain } from '@api.mabell/core';
import { ArtistsRO } from '../artist/ros/artists.ro';
import { AlbumsRO } from '../album/ros/albums.ro';
import { PlaylistsRO } from '../playlist/ros/playlists.ro';

@ApiTags('Popular')
@Controller({ path: '/popular' })
export class PopularController {
  constructor(private readonly _QB: QueryBus) {}

  @ApiOperation({ summary: 'Get popular artists', operationId: 'getPopularArtists' })
  @ApiQuery({
    required: true,
    type: String,
    name: 'genres',
    description: 'Genres',
    example: `${Domain.Common.Genres['Hip-Hop']},${Domain.Common.Genres.Pop}`,
  })
  @ApiQuery({ required: false, type: Number, name: 'offset', description: 'Offset', example: 0 })
  @ApiQuery({ required: false, type: Number, name: 'limit', description: 'Limit', example: 50 })
  @ApiOkResponse({ description: 'Artists', type: ArtistsRO })
  @Get('/artists')
  async getPopularArtists(
    @Query('genres', new ParseArrayPipe()) genres: string[],
    @Query('offset', new DefaultValuePipe(0), ParseIntPipe) offset: number,
    @Query('limit', new DefaultValuePipe(50), ParseIntPipe) limit: number,
  ): Promise<ArtistsRO> {
    const foundArtists = await this._QB.execute(
      new App.CQRS.GetArtistsByGenresQuery(genres, {
        isPublic: true,
        pagination: new Shared.DTOs.OffsetLimitPaginationDTO(limit, offset),
      }),
    );

    return new ArtistsRO(foundArtists);
  }

  @ApiOperation({ summary: 'Get popular albums', operationId: 'getPopularAlbums' })
  @ApiQuery({
    required: true,
    type: String,
    name: 'genres',
    description: 'Genres',
    example: `${Domain.Common.Genres['Hip-Hop']},${Domain.Common.Genres.Pop}`,
  })
  @ApiQuery({ required: false, type: Number, name: 'offset', description: 'Offset', example: 0 })
  @ApiQuery({ required: false, type: Number, name: 'limit', description: 'Limit', example: 50 })
  @ApiOkResponse({ description: 'Albums', type: AlbumsRO })
  @Get('/albums')
  async getPopularAlbums(
    @Query('genres', new ParseArrayPipe()) genres: string[],
    @Query('offset', new DefaultValuePipe(0), ParseIntPipe) offset: number,
    @Query('limit', new DefaultValuePipe(50), ParseIntPipe) limit: number,
  ): Promise<AlbumsRO> {
    const foundAlbums = await this._QB.execute(
      new App.CQRS.GetAlbumsByGenresQuery(genres, {
        isPublic: true,
        pagination: new Shared.DTOs.OffsetLimitPaginationDTO(limit, offset),
      }),
    );

    return new AlbumsRO(foundAlbums);
  }

  @ApiOperation({ summary: 'Get popular playlists', operationId: 'getPopularPlaylists' })
  @ApiQuery({
    required: true,
    type: String,
    name: 'genres',
    description: 'Genres',
    example: `${Domain.Common.Genres['Hip-Hop']},${Domain.Common.Genres.Pop}`,
  })
  @ApiQuery({ required: false, type: Number, name: 'offset', description: 'Offset', example: 0 })
  @ApiQuery({ required: false, type: Number, name: 'limit', description: 'Limit', example: 50 })
  @ApiOkResponse({ description: 'Playlists', type: PlaylistsRO })
  @Get('/playlists')
  async getPopularPlaylists(
    @Query('genres', new ParseArrayPipe()) genres: string[],
    @Query('offset', new DefaultValuePipe(0), ParseIntPipe) offset: number,
    @Query('limit', new DefaultValuePipe(50), ParseIntPipe) limit: number,
  ): Promise<PlaylistsRO> {
    const foundPlaylists = await this._QB.execute(
      new App.CQRS.GetPlaylistsByGenreQuery(genres, {
        isPublic: true,
        pagination: new Shared.DTOs.OffsetLimitPaginationDTO(limit, offset),
      }),
    );

    return new PlaylistsRO(foundPlaylists);
  }
}
