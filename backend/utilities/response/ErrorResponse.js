import Response from './Response.js';

export default class ErrorResponse extends Response {
  constructor(message, status, stack) {
    super(message, status);
    this.success = false;
    this.stack = stack;
  }
}
