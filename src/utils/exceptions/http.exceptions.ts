export interface IDefaultResponse {
  status: number;
  message: string;
}

class HttpException extends Error implements IDefaultResponse {
  public status: number;
  public message: string;

  constructor(
    status: IDefaultResponse['status'],
    message: IDefaultResponse['message'],
  ) {
    super(message);
    this.status = status;
    this.message = message;
  }
}

export default HttpException;
