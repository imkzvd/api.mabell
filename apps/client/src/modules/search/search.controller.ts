import { Controller, Get, Query } from '@nestjs/common';
import { ApiOkResponse, ApiOperation, ApiQuery, ApiTags } from '@nestjs/swagger';
import { App } from '@api.mabell/core';
import { QueryBus } from '@api.mabell/cqrs';
import { SearchResultRO } from './ros/search-result.ro';

@ApiTags('Search')
@Controller('/search')
export class SearchController {
  constructor(private readonly _QB: QueryBus) {}

  @ApiOperation({ summary: 'Global search', operationId: 'search' })
  @ApiQuery({
    required: true,
    type: String,
    name: 'q',
    description: 'Query',
    example: 'eminem',
  })
  @ApiOkResponse({ description: 'Result', type: SearchResultRO })
  @Get('/')
  async search(@Query('q') q: string): Promise<SearchResultRO> {
    const result = await this._QB.execute(
      new App.CQRS.GetItemsQuery(q, {
        collections: [
          App.Ports.SEARCH_COLLECTIONS.artists,
          App.Ports.SEARCH_COLLECTIONS.albums,
          App.Ports.SEARCH_COLLECTIONS.tracks,
          App.Ports.SEARCH_COLLECTIONS.playlists,
        ],
        isGlobal: true,
      }),
    );

    return new SearchResultRO(result);
  }
}
