import { NextFunction, Request, RequestHandler, Response } from 'express';
import Joi from 'joi';

function validationMiddleware(schema: Joi.Schema): RequestHandler {
  return async (
    req: Request,
    res: Response,
    next: NextFunction,
  ): Promise<void> => {
    const validationOptions: Joi.ValidationOptions = {
      abortEarly: false,
      allowUnknown: true,
      stripUnknown: true,
    };

    try {
      const value = await schema.validateAsync(req.body, validationOptions);
      req.body = value;
      next();
    } catch (err) {
      console.error(err);

      const errors: string[] = [];
      (err as Joi.ValidationError).details.forEach(
        (e: Joi.ValidationErrorItem) => {
          errors.push(e.message);
        },
      );

      res.status(400).send({ errors });
    }
  };
}

export default validationMiddleware;
