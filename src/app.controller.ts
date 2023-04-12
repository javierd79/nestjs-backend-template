import { Controller, Get } from '@nestjs/common';

@Controller('routes')
export class AppController {
  constructor() {}

  @Get()
  getRoutes() {
    return null;
  }
}