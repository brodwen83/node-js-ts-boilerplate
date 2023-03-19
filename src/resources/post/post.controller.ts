import { NextFunction, Request, Response, Router } from 'express';

import HttpException from '@/utils/exceptions/http.exceptions';
import Controller from '@/utils/interfaces/controller.interface';

import PostService from '@/resources/post/post.service';
import validate from '@/resources/post/post.validation';

import { IGetPostsResponse, IPostResponse } from './post.interface';

import validationMiddleware from '@/middleware/validation.middleware';
import { isValidObjectId } from 'mongoose';

class PostController implements Controller {
  public path = '/posts';
  public router = Router();
  private postService = new PostService();

  constructor() {
    this.initializeRoutes();
  }

  private sendError = (
    error: unknown,
    status: number,
    defaultMessage: string,
    next: NextFunction,
  ) => {
    if (error instanceof Error) {
      next(new HttpException(status, error.message));
    } else next(new HttpException(status, defaultMessage));
  };

  private create = async (
    req: Request,
    res: Response,
    next: NextFunction,
  ): Promise<Response<IPostResponse> | void> => {
    try {
      const { title, body } = req.body;
      const post = await this.postService.create(title, body);

      res.status(201).json({
        success: true,
        status: 201,
        message: 'Create post successful!',
        post,
      });
    } catch (err) {
      console.error(err);
      this.sendError(err, 400, 'Create post failed', next);
    }
  };

  private getPosts = async (
    req: Request,
    res: Response,
    next: NextFunction,
  ): Promise<Response<IGetPostsResponse> | void> => {
    try {
      const posts = await this.postService.getPosts(req.query || {});
      res.status(200).json({
        success: true,
        status: 200,
        message: 'Get all posts success!',
        posts,
      });
    } catch (err) {
      console.error(err);
      this.sendError(err, 400, 'Get all post failed.', next);
    }
  };

  private getPostById = async (
    req: Request,
    res: Response,
    next: NextFunction,
  ): Promise<Response<IPostResponse> | void> => {
    const { postId } = req.params;

    try {
      if (!isValidObjectId(postId)) {
        throw new Error('Invalid id.');
      }

      const post = await this.postService.getPostById(postId);
      res.status(200).json({
        success: true,
        status: 200,
        message: 'Get post success!',
        post,
      });
    } catch (err) {
      console.error(err);
      this.sendError(err, 400, 'Get post by id failed.', next);
    }
  };

  private initializeRoutes(): void {
    // POST : '/api/v1/posts
    this.router.post(
      `${this.path}`,
      validationMiddleware(validate.create),
      this.create,
    );

    // GET : '/api/v1/posts?filterQuery
    this.router.get(`${this.path}`, this.getPosts);

    // GET : '/api/v1/posts/:postId
    this.router.get(`${this.path}/:postId`, this.getPostById);
  }
}

export default PostController;
