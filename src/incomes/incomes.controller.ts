import {
  Controller,
  Get,
  Post,
  UseInterceptors,
  UploadedFile,
  Query,
  UseGuards,
} from '@nestjs/common';
import { IncomesService } from './incomes.service';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';

import * as path from 'path';
import * as fs from 'fs';
import * as csvParser from 'csv-parser';
import { JwtAuthGuard } from '../auth/jwtAuth.guard';
import {
  ApiBearerAuth,
  ApiBody,
  ApiConsumes,
  ApiOperation,
  ApiQuery,
  ApiTags,
} from '@nestjs/swagger';

@ApiTags('Incomes and Reports')
@Controller('incomes')
export class IncomesController {
  constructor(private readonly incomesService: IncomesService) {}

  @ApiBearerAuth()
  @Post('upload')
  @UseGuards(JwtAuthGuard)
  @ApiOperation({ summary: 'Upload CSV file with financial transactions' })
  @ApiConsumes('multipart/form-data')
  @ApiBody({
    schema: {
      type: 'object',
      properties: {
        file: {
          type: 'string',
          format: 'binary',
        },
      },
    },
  })
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
  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  @ApiOperation({ summary: 'Get Report from CSV file' })
  @ApiQuery({ name: 'source', required: false })
  @ApiQuery({ name: 'date', required: false })
  async getReport(
    @Query('source') source: string,
    @Query('date') date: string,
  ) {
    return this.incomesService.generateReport({ source, date });
  }

  @Get()
  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  @ApiOperation({ summary: 'Get all items from Data base' })
  findAll() {
    return this.incomesService.findAll();
  }
}
