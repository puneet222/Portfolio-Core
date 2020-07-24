import express, { Express } from 'express';
import bodyParser from 'body-parser';
import { connectDB } from './config/db';

import { certificateRouter } from './routes/cetificate';
import { hitsRouter } from './routes/hits';
import { infoRouter } from './routes/info';
import { jobRouter } from './routes/job';
import { projectRouter } from './routes/project';
import { skillRouter } from './routes/skill';
import { userRouter } from './routes/user';
import { authRouter } from './routes/auth';

const app: Express = express();

// connect DB
connectDB();

// Init middleware
app.use(bodyParser.json());

const PORT = process.env.port || 5000;

app.get('/', (req, res) => {
    res.send('Welcome to portfolio core project');
});

// Define Routes
app.use('/api/user', userRouter);
app.use('/api/auth', authRouter);
// app.use('/api/info', infoRouter);
// app.use('/api/skill', skillRouter);
app.use('/api/certificate', certificateRouter);
// app.use('/api/job', jobRouter);
// app.use('/api/hits', hitsRouter);
// app.use('/api/project', projectRouter);

app.listen(PORT, () => {
    return console.log(`server is listening on ${PORT}`);
});