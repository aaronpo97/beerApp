import { Response, ResponseInterface } from './Response.js';

export interface ErrorResponseInterface extends ResponseInterface {
  stack?: string;
  success: false;
}

export class ErrorResponse extends Response {
  success: boolean;
  stack?: string;

  constructor(message: string, status: number, stack: string | undefined) {
    super(message, status);
    this.success = false;
    this.stack = stack;
  }
}
