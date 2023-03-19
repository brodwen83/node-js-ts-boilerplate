import { Document } from 'mongoose';

import { IDefaultResponse } from '@/utils/exceptions/http.exceptions';

export default interface IPost extends Document {
  title: string;
  body: string;
}

export interface IPostResponse extends IDefaultResponse {
  post: IPost;
}
export interface IGetPostsResponse extends IDefaultResponse {
  posts: IPost[] | [];
}
