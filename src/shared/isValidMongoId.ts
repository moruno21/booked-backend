import { HttpException, HttpStatus } from '@nestjs/common';
import { Types } from 'mongoose';

export function isValidMongoId(id: string | number) {
  const isValidId = Types.ObjectId.isValid(id);
  if (!isValidId) throw new HttpException('Invalid ID', HttpStatus.BAD_REQUEST);
}
