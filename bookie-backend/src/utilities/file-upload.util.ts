import { BadRequestException } from '@nestjs/common';
import { extname } from 'path';
import * as AWS from 'aws-sdk';
import { S3 } from 'aws-sdk';
import { diskStorage } from 'multer';

AWS.config.update({
  accessKeyId: process.env.AWS_ACCESS_KEY_ID,
  secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
  region: process.env.AWS_REGION,
});

const s3 = new S3();

export const pdfFileUploadOptions = {
  storage: diskStorage({
    destination: './uploads',  // Keep uploading to a local folder
    filename: (req, file, cb) => {
      const filename = `${Date.now()}${extname(file.originalname)}`;
      cb(null, filename);
    },
  }),
  fileFilter: (req, file, cb) => {
    if (file.mimetype === 'application/pdf') {
      cb(null, true);
    } else {
      cb(new BadRequestException('Only PDF files are allowed'), false);
    }
  },
  limits: { fileSize: 10 * 1024 * 1024 }, // 10 MB
};

export const bookCoverUploadOptions = {
  storage: diskStorage({
    destination: './uploads/covers',  // Keep uploading to a local folder
    filename: (req, file, cb) => {
      const filename = `${Date.now()}-cover${extname(file.originalname)}`;
      cb(null, filename);
    },
  }),
  fileFilter: (req, file, cb) => {
    const allowedMimeTypes = ['image/jpeg', 'image/png', 'image/webp'];
    if (allowedMimeTypes.includes(file.mimetype)) {
      cb(null, true);
    } else {
      cb(new BadRequestException('Only image files (JPEG, PNG, WEBP) are allowed'), false);
    }
  },
  limits: { fileSize: 5 * 1024 * 1024 }, // 5 MB
};
