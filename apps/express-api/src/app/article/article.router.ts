import * as express from 'express';
const articleRouter = express.Router();
import {ArticleService} from './article.service';

articleRouter.get('/', async (req, res) => {
  console.log(await ArticleService.getAll())
  res.status(200).json(await ArticleService.getAll());
});

articleRouter.get('/:id', async (req, res) => {
  res.status(200).json(await ArticleService.get(req.params?.id));
});

articleRouter.post('/', async (req, res) => {
  res.status(200).json(await ArticleService.create(req.body));
});

articleRouter.delete('/:id', async (req, res) => {
  res.status(200).json(await ArticleService.delete(req.params.id));
});

export default articleRouter;
