import { ApiProperty } from '@nestjs/swagger';

export class BadRequestResponse {
  @ApiProperty({ example: '400' })
  statusCode: 400;

  @ApiProperty({ example: 'Bad Reqeust' })
  error: 'Bad Reqeust';

  @ApiProperty()
  message: string;
}
