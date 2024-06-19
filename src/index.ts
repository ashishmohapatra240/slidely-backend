// src/index.ts

import express from 'express';
import bodyParser from 'body-parser';
import formRoutes from './routes/formRoutes';

const app = express();
const PORT = 3000;

app.use(bodyParser.json());
app.use('/', formRoutes);

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
