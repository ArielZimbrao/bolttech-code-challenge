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

export class ProjectNotFoundError extends HttpException {
  constructor() {
    super('Project not found', HttpStatus.NOT_FOUND);
  }
}

export class TaskNotFoundError extends HttpException {
  constructor() {
    super('Task not found', HttpStatus.NOT_FOUND);
  }
}