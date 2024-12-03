import { S3 } from 'aws-sdk';
import { BadRequestException } from '@nestjs/common';

const s3 = new S3({
  accessKeyId: process.env.AWS_ACCESS_KEY_ID,
  secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
  region: process.env.AWS_REGION,
});

const buckety = process.env.S3_BUCKET_NAME;
export const uploadFileToS3 = async (file: Express.Multer.File, bucket: string, folder: string): Promise<string> => {
    if (!file) {
      throw new BadRequestException('File is required');
    }
  
    if (!bucket) {
      throw new Error('Bucket name is not provided');
    }
  
    const key = `${folder}/${Date.now()}-${file.originalname}`;
    const params = {
      Bucket: bucket,
      Key: key,
      Body: file.buffer,
      ContentType: file.mimetype,
    };
  
    console.log('S3 Upload Params:', params); // Add this line for debugging
  
    try {
      const uploadResult = await s3.upload(params).promise();
      return uploadResult.Location;
    } catch (error) {
      console.error('S3 upload error:', error);
      throw new BadRequestException('Failed to upload file to S3');
    }
  };
  
