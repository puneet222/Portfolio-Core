import express from 'express';

const app = express();
const PORT = process.env.port || 5000;

app.get('/', (req, res) => {
    res.send('Welcome to portfolio core project');
});

// Define Routes
app.use('/api/user', require('./routes/user'));
app.use('/api/auth', require('./routes/auth'));

app.listen(PORT, () => {
    return console.log(`server is listening on ${PORT}`);
});