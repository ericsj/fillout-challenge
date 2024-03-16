import { IsNumber, IsString } from 'class-validator';

export class Question {
  @IsString()
  id: string;
  @IsString()
  name: string;
  @IsString()
  type: string;
  @IsString()
  value: string;
}

class Calculation {
  @IsString()
  id: string;
  @IsString()
  name: string;
  @IsString()
  type: string;
  @IsString()
  value: string;
}

class UrlParamenters {
  @IsString()
  id: string;
  @IsString()
  name: string;
  @IsString()
  value: string;
}

class Quiz {
  @IsNumber()
  score: string;
  @IsNumber()
  maxScore: string;
}

export class Response {
  questions: Question[];
  calculations: Calculation[];
  urlParamenters: UrlParamenters[];
  quiz: Quiz;
  submissionId: string;
  submissionType: string;
}

export class GetManyResponse {
  responses: Response[];
  totalResponses: number;
  pageCount: number;
}
