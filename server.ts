import express from 'express';
import bodyParser from 'body-parser';
import { connectDB } from './config/db';

import { certificateRouter } from './routes/cetifiicate';
import { hitsRouter } from './routes/hits';
import { infoRouter } from './routes/info';
import { jobRouter } from './routes/job';

const app = express();

// connect DB
connectDB();

// Init middleware
app.use(bodyParser.json());

const PORT = process.env.port || 5000;

app.get('/', (req, res) => {
    res.send('Welcome to portfolio core project');
});

// Define Routes
// app.use('/api/user', require('./routes/user'));
app.use('/api/auth', require('./routes/auth'));
app.use('/api/info', infoRouter);
// app.use('/api/skill', require('./routes/skill'));
app.use('/api/certificate', certificateRouter);
app.use('/api/job', jobRouter);
app.use('/api/hits', hitsRouter);
// app.use('/api/project', require('./routes/project'));

app.listen(PORT, () => {
    return console.log(`server is listening on ${PORT}`);
});