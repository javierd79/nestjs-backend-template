import { Controller, Get, Post, UseInterceptors, UploadedFile } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { AvatarsService } from './avatar.service';

@Controller('avatars')
export class AvatarsController {
  constructor(private readonly avatarsService: AvatarsService) {}

  @Post()
  @UseInterceptors(FileInterceptor('file'))
  async create(@UploadedFile() file: Express.Multer.File) {
    return this.avatarsService.create(file);
  }

  @Get()
  async get() {
    return this.avatarsService.getAll();
  }
}
