import { Body, Controller, Post } from '@nestjs/common';
import { AssignService } from './assign.service';

@Controller('assign')
export class AssignController {
  constructor(private readonly assignService: AssignService) {}

  @Post()
  assign(@Body('taskId') taskId: string, @Body('teamId') teamId: string) {
    return this.assignService.assign(taskId, teamId);
  }
}
