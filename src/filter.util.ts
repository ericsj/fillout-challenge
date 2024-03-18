import { BadRequestException, NotFoundException } from '@nestjs/common';
import { FilterClauseType } from './dto/FilterClauseType.dto';
import { Response } from './dto/GetManyResponse.dto';

export const filterResponse = (
  filter: FilterClauseType,
  data: Response[],
): Response[] => {
  console.log('filter', filter);
  const findQuestion = (response: Response, condition: string) => {
    const foundQuestion = response.questions.find(
      (question) => question.id === filter.id,
    );
    if (!foundQuestion) throw new NotFoundException('Question not found');
    if (condition === 'greater_than' || condition === 'less_than') {
      if (isNaN(Number(foundQuestion.value)))
        throw new BadRequestException('Invalid filter value');
    }
    return foundQuestion;
  };
  switch (filter.condition) {
    case 'does_not_equal':
      return data.filter((response) => {
        return findQuestion(response, filter.condition).value !== filter.value;
      });
    case 'equals': {
      return data.filter((response) => {
        return findQuestion(response, filter.condition).value === filter.value;
      });
    }
    case 'greater_than': {
      return data.filter((response) => {
        return findQuestion(response, filter.condition).value > filter.value;
      });
    }
    case 'less_than': {
      return data.filter((response) => {
        return findQuestion(response, filter.condition).value < filter.value;
      });
    }
  }
};
