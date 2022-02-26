import Response from './Response.js';

export default class SuccessResponse extends Response {
  constructor(message, status, payload, newAccessToken) {
    super(message, status);
    this.success = true;
    this.payload = payload;
    this.newAccessToken = newAccessToken;
  }
}
