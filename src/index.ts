import 'module-alias/register';

import 'dotenv/config';

import PostController from '@/resources/post/post.controller';
import validateEnv from '@/utils/validateEnv';

import App from './app';

validateEnv();

const PORT = process.env.PORT || 5000;

const app = new App([new PostController()], Number(PORT));
app.listen();
