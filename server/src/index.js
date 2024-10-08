import express from 'express'
const app = express();
const PORT = process.env.PORT;


app.get('/', (req, res) => {
    res.send('home');
})

app.listen(PORT, () => {
    console.log(`http://localhost:${PORT}`);
})

