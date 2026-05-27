// src/lib/errors.ts

export type ErrorCode =
  | 'BAD_REQUEST'
  | 'UNAUTHORIZED'
  | 'FORBIDDEN'
  | 'NOT_FOUND'
  | 'CONFLICT'
  | 'INTERNAL_SERVER_ERROR';

export class AppError extends Error {
  public readonly code: ErrorCode;
  public readonly statusCode: number;
  public readonly isOperational: boolean;

  constructor(code: ErrorCode, message: string, statusCode: number, isOperational = true) {
    super(message);
    Object.setPrototypeOf(this, new Target().constructor); // Fix call stack inheritance
    this.code = code;
    this.statusCode = statusCode;
    this.isOperational = isOperational; // true for known operational errors, false for systemic crashes
    Error.captureStackTrace(this, this.constructor);
  }
}

// Reusable standard sub-classes for clean throwing
export class BadRequestError extends AppError {
  constructor(message = 'Bad Request') {
    super('BAD_REQUEST', message, 400);
  }
}

export class UnauthorizedError extends AppError {
  constructor(message = 'Authentication required') {
    super('UNAUTHORIZED', message, 401);
  }
}

export class ForbiddenError extends AppError {
  constructor(message = 'You do not have permission to access this resource') {
    super('FORBIDDEN', message, 403);
  }
}

export class NotFoundError extends AppError {
  constructor(message = 'Resource not found') {
    super('NOT_FOUND', message, 404);
  }
}

export class ConflictError extends AppError {
  constructor(message = 'Resource conflict occurred') {
    super('CONFLICT', message, 409);
  }
}