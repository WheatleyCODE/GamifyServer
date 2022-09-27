import { Body, Controller, Post, UseGuards, UsePipes } from '@nestjs/common';
import { JwtAuthGuard } from 'src/guards/jwt.auth.guard';
import { ValidationPipe } from 'src/pipes/validation.pipe';
import { DeleteOneItemDto } from './dto/DeleteOneItemDto';
import { RemoverService } from './remover.service';

@Controller('/api/remover')
export class RemoverController {
  constructor(private readonly removerService: RemoverService) {}

  @UseGuards(JwtAuthGuard)
  @UsePipes(ValidationPipe)
  @Post('/delete')
  getOneStorage(@Body() { id, type }: DeleteOneItemDto): Promise<any> {
    return this.removerService.deleteOne(id, type);
  }
}
