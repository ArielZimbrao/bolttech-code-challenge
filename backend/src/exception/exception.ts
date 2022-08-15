import { HttpStatus, HttpException } from '@nestjs/common';

export class AccessUnauthorizedError extends HttpException {
  constructor() {
    super(`Email or password incorrect`, HttpStatus.UNAUTHORIZED);
  }
}

export class UserNotFoundError extends HttpException {
  constructor() {
    super('User not found', HttpStatus.NOT_FOUND);
  }
}

export class UserAlreadyExistsError extends HttpException {
  constructor() {
    super('User already exists', HttpStatus.BAD_REQUEST);
  }
}