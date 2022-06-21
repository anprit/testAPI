import * as express from 'express';
const router = express.Router();
import articleRouter from '../article/article.router';

router.get('/', (req, res) => {
  res.send({ message: 'Welcome to express-api!' });
});

// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
router.use('/article', articleRouter);

export default router;
