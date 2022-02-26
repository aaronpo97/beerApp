import { ResponseInterface, Response } from './Response';

export interface SuccessResponseInterface extends ResponseInterface {
  success: true;
  newAccessToken?: string;
  payload: any;
}

export class SuccessResponse extends Response {
  success: true;
  payload: any;
  newAccessToken?: string;

  constructor(message: string, status: number, payload: any, newAccessToken: string | undefined) {
    super(message, status);
    this.success = true;
    this.payload = payload;
    this.newAccessToken = newAccessToken;
  }
}
