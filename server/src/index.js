import express from 'express';
import cors from 'cors';
import routes from './routes/index.js';
// import db from './config/database.js';
import db from './config/database.js';
const app = express();
const port = 8080;
app.use(cors());
// middleware use Parse data from body request (Form html)
app.use(express.urlencoded({ extended: false }));
// middleware use Parse data from javascript (fetch)
app.use(express.json());

db.connect((err) => {
    if (err) {
        console.log(err);
    }
    else {
        console.log('success to connect mysql');
    }
})

routes(app);

// app.listen(port, () => {
//     console.log(`http://localhost:${port}`);
// });

app.listen(8080, '192.168.138.241', () => {
    console.log('Backend is running on http://192.168.138.241:8080');
  });

// app.listen(8080, '0.0.0.0', () => {
//     console.log('Backend is running on http://0.0.0.0:8080');
// });
  

