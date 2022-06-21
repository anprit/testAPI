import * as express from 'express';
const router = express.Router();
import articleRouter from '../article/article.router';
import userRouter from "../user/user.router";

router.get('/', (req, res) => {
  res.send({ message: 'Welcome to express-api!' });
});

// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
router.use('/article', articleRouter);
router.use('/user', userRouter);
router.use('*', (req, res) => {
  res.status(404).json({
    path: req.originalUrl
  });
});
export default router;
