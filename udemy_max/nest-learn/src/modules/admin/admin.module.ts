import { Module } from '@nestjs/common';
import { MulterModule } from '@nestjs/platform-express';
import { AdminController } from './admin.controller';
import * as path from 'path';
import * as fs from 'fs';
import * as multer from 'multer';

const fileStorage = multer.diskStorage({
  destination: (req, file, cb) => {
    const date = new Date();
    const dir = path.resolve(
      path.dirname(process.mainModule.filename),
      'uploads',
      date.getFullYear().toString(),
      date.getMonth().toString() + 1,
      date.getDate().toString(),
    );
    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir, { recursive: true });
    }
    cb(null, dir);
  },
  filename: (req, file, cb) => {
    cb(null, new Date().toISOString() + '-' + file.originalname);
  },
});
@Module({
  imports: [
    MulterModule.register({
      storage: fileStorage,
    }),
  ],
  controllers: [AdminController],
})
export class AdminModule {}
