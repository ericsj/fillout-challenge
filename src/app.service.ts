import { Injectable } from '@nestjs/common';
import { FilterClauseType } from './dto/FilterClauseType.dto';
import { GetManyResponse } from './dto/GetManyResponse.dto';
import { HttpService } from '@nestjs/axios';
import { ConfigService } from '@nestjs/config';
import { FilloutApiResponse } from './dto/FilloutApiResponse.dto';
import { filterResponse } from './filter.util';

@Injectable()
export class AppService {
  constructor(
    private readonly httpService: HttpService,
    private configService: ConfigService,
  ) {}

  async fetchAll(formId: string) {
    const api = this.configService.get<string>('API');
    const url = `${api}/forms/${formId}/submissions`;
    const rawData = (
      await this.httpService.axiosRef.get<FilloutApiResponse>(url)
    ).data;
    let allResponses = [];
    for (let i = 0; i < rawData.pageCount; i++) {
      const page = (
        await this.httpService.axiosRef.get<FilloutApiResponse>(url, {
          params: {
            limit: 100,
            offset: i * 100,
          },
        })
      ).data;
      allResponses = allResponses.concat(page.responses);
    }
    return allResponses;
  }

  async getMany(
    formId: string,
    offset: number,
    limit: number,
    filters?: FilterClauseType[],
  ): Promise<GetManyResponse> {
    const responses = await this.fetchAll(formId);
    let result = responses;
    if (filters) {
      for (const filter of filters) {
        result = filterResponse(filter, result);
      }
    }
    return {
      responses: result.slice(offset, offset + limit),
      totalResponses: result.length,
      pageCount: Math.ceil(result.length / limit),
    };
  }
}
