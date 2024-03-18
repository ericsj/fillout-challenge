import {
  BadRequestException,
  Controller,
  Get,
  Param,
  Query,
} from '@nestjs/common';
import { AppService } from './app.service';
import { FilterClauseType } from './dto/FilterClauseType.dto';
import { GetManyResponse } from './dto/GetManyResponse.dto';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get('/:formId/filteredResponses')
  async getMany(
    @Param('formId') formId: string,
    @Query('offset') offset: number = 0,
    @Query('limit') limit: number = 100,
    @Query('afterDate') afterDate: string,
    @Query('beforeDate') beforeDate: string,
    @Query('status') status: string,
    @Query('includeEditLink') includeEditLink: string,
    @Query('sort') sort: string,
    @Query('filters') filters?: string,
  ): Promise<GetManyResponse> {
    const externalFilters = {
      afterDate,
      beforeDate,
      status,
      includeEditLink,
      sort,
    };
    if (filters) {
      let jsonFilters = [];
      try {
        jsonFilters = JSON.parse(filters) as FilterClauseType[];
      } catch (e) {
        throw new BadRequestException(
          "Invalid filter query: couldn't parse JSON string.",
        );
      }
      return await this.appService.getMany(
        formId,
        externalFilters,
        offset,
        limit,
        jsonFilters,
      );
    }
    return await this.appService.getMany(
      formId,
      externalFilters,
      offset,
      limit,
    );
  }
}
