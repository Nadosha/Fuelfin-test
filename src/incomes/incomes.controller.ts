import {
  Controller,
  Get,
  Post,
  UseInterceptors,
  UploadedFile,
  Query,
} from '@nestjs/common';
import { IncomesService } from './incomes.service';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';

import * as path from 'path';
import * as fs from 'fs';
import * as csvParser from 'csv-parser';

@Controller('incomes')
export class IncomesController {
  constructor(private readonly incomesService: IncomesService) {}

  @Post('upload')
  @UseInterceptors(
    FileInterceptor('file', {
      storage: diskStorage({
        destination: './uploads',
        filename: (req, file, cb) => {
          const filename: string =
            path.parse(file.originalname).name.replace(/\s/g, '') +
            path.extname(file.originalname);
          cb(null, `${filename}`);
        },
      }),
    }),
  )
  uploadFile(@UploadedFile() file: Express.Multer.File) {
    const results = [];
    fs.createReadStream(file.path)
      .pipe(csvParser())
      .on('data', (data) => results.push(data))
      .on('end', async () => {
        return await this.incomesService.create(results);
      });
    return 200;
  }

  @Get('report')
  async getReport(
    @Query('source') source: string,
    @Query('date') date: string,
  ) {
    return this.incomesService.generateReport({ source, date });
  }

  @Get()
  findAll() {
    return this.incomesService.findAll();
  }
}
