import { Controller, Get, Res } from '@nestjs/common';

@Controller()
export class AppController {
  @Get()
  redirect(@Res() res): void {
    res.redirect(process.env.URL_CLIENT);
  }
}
