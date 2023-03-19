import { Request, Response } from 'express';

import HttpException from '@/utils/exceptions/http.exceptions';

function errorMiddleware(
  error: HttpException,
  _req: Request,
  res: Response,
): void {
  const status = error.status || 500;
  const message = error.message || 'Something went wrong.';

  res.status(status).send({
    status,
    message,
  });
}

export default errorMiddleware;
