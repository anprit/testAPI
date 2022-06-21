import * as express from 'express';
const articleRouter = express.Router();
import {ArticleController} from './article.controller';

articleRouter.get('/published', ArticleController.published);
articleRouter.get('/', ArticleController.getAll);
articleRouter.post('/', ArticleController.create);
articleRouter.get('/:id', ArticleController.get);
articleRouter.delete('/:id', ArticleController.delete);

export default articleRouter;
