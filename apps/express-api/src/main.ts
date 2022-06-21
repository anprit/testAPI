import * as express from 'express';
import {initDB} from "./app/helpers/dbHelper";
import apiRouter from "./app/router"
import * as bodyParser from "body-parser";
import * as cors from 'cors';

const app = express();
app.use(cors());
app.use(bodyParser.json());

app.use('/api', apiRouter);

const port = process.env.port || 3333;
const server = app.listen(port, async () => {
  console.log(`Listening at http://localhost:${port}/api`);
  await initDB();
});
server.on('error', console.error);
