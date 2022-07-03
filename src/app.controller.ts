/* eslint-disable prettier/prettier */
import { Controller, Get } from '@nestjs/common';

@Controller()
export class AppController {
  @Get()
  hello() {
    return `Welcome to ISD API ro see more detail go to "/api"`;
  }
}
