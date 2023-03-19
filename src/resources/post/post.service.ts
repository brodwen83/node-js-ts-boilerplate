import { FilterQuery } from 'mongoose';

import PostModel from './post.model';

import IPost from './post.interface';

class PostService {
  /**
   * Create new Post
   * @param title title of the post
   * @param body body of the post
   * @returns Promise<IPostResponse | void>
   */
  public create = async (title: IPost['title'], body: IPost['body']) => {
    try {
      const newPost = PostModel.create({ title, body });
      return newPost;
    } catch (err) {
      console.error(err);
      throw new Error('Unable to create post.');
    }
  };

  /**
   * Get all posts
   * @returns Promise<IGetAllPostsResponse | void>
   */
  public getPosts = async (filterQuery: FilterQuery<IPost> = {}) => {
    try {
      const posts = await PostModel.find(filterQuery);
      return posts;
    } catch (err) {
      console.error(err);
      throw new Error('Unable to get all posts.');
    }
  };

  public getPostById = async (postId: string) => {
    try {
      const post = await PostModel.findById(postId);
      if (!post) {
        throw new Error(`Post with an id: ${postId} not found!`);
      }

      return post;
    } catch (err) {
      console.error(err);

      if (err instanceof Error) {
        throw new Error(err.message);
      }
      throw new Error('Unable to get post.');
    }
  };
}

export default PostService;
