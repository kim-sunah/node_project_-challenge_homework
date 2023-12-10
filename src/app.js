import 'dotenv/config';
import express from 'express';
const app = express();
import user from './routers/users.router.js';
import products from './routers/products.router.js';
import errorMiddleware from './middlewares/error-handler.middleware.js';

app.use(express.json());

app.use('/api', express.urlencoded({ extended: false }), user);
app.use('/api', products);
app.use(errorMiddleware);

app.listen(process.env.SERVER_PORT, () => {
  console.log(`${process.env.SERVER_PORT}포트로 서버가 요청을 받을 준비가 됐어요`);
});
