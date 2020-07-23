import express from 'express';
import bodyParser from 'body-parser';
const connectDB = require('./config/db');

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
app.use('/api/user', require('./routes/user'));
app.use('/api/auth', require('./routes/auth'));
app.use('/api/info', require('./routes/info'));
app.use('/api/skill', require('./routes/skill'));
app.use('/api/certificate', require('./routes/cetifiicate'));
app.use('/api/job', require('./routes/job'));

app.listen(PORT, () => {
    return console.log(`server is listening on ${PORT}`);
});