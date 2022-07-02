import { Body, Controller, Post } from '@nestjs/common';
import { AssignService } from './assign.service';

@Controller('assign')
export class AssignController {
  constructor(private readonly assignService: AssignService) {}

  @Post()
  assign(@Body('taskId') taskId: string, @Body('userId') userId: string) {
    return this.assignService.assign(taskId, userId);
  }
}
