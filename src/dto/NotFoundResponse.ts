import { ApiProperty } from '@nestjs/swagger';

export class NotFoundResponse {
  @ApiProperty({ example: '404' })
  statusCode: 404;

  @ApiProperty({ example: 'Not Found' })
  error: 'Not Found';

  @ApiProperty()
  message: string;
}
