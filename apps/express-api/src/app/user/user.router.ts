import * as express from 'express';
const userRouter = express.Router();
import {UserController} from './user.controller';

userRouter.post('/', UserController.create);

export default userRouter;
