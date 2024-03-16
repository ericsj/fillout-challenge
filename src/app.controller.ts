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
    @Param('offset') offset: number = 0,
    @Param('limit') limit: number = 100,
    @Query('filters') filters?: string,
  ): Promise<GetManyResponse> {
    if (filters) {
      let jsonFilters = [];
      try {
        jsonFilters = JSON.parse(filters) as FilterClauseType[];
      } catch (e) {
        throw new BadRequestException(
          "Invalid filter query: couldn't parse JSON string.",
        );
      }
      return await this.appService.getMany(formId, offset, limit, jsonFilters);
    }
    return await this.appService.getMany(formId, offset, limit);
  }
}
