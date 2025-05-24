import dotenv from 'dotenv';
dotenv.config();

import express from 'express';
import helmet from 'helmet';

import './config/db.config';
import router from './routes/school.route';
import errorHandler from './middleware/errorHandler.middleware';

const app = express();


app.use(helmet());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/api/v1', router);

app.use(errorHandler);


export default app