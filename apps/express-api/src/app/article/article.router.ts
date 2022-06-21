import * as express from 'express';
const articleRouter = express.Router();
import {ArticleController} from './article.controller';
import isLoggedIn from "../middlewares";

articleRouter.get('/published', ArticleController.published);
articleRouter.get('/', ArticleController.getAll);
articleRouter.post('/', isLoggedIn, ArticleController.create);
articleRouter.get('/:id', ArticleController.get);
articleRouter.delete('/:id', isLoggedIn, ArticleController.delete);

export default articleRouter;
