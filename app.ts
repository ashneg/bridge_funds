import express from 'express';
import transactionRoutes from './routes/transactionRoutes';

const app = express();
const port = 3001;

app.use(express.json());
app.use('/', transactionRoutes);

app.listen(port, () => {
  console.log(`API listening at http://localhost:${port}`);
});
