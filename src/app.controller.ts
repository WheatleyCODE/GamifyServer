import { Controller, Get, Redirect } from '@nestjs/common';

@Controller()
export class AppController {
  @Get()
  @Redirect(process.env.URL_CLIENT || 'http://localhost:3000', 301)
  redirect(): null {
    return null;
  }
}
