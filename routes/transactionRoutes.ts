import express from 'express';
import { getQuotes, getTransactionStatus, setupClient } from '../controllers/transactionController';

const router = express.Router();

router.get('/', (req, res) => {
  res.send('API is running');
});

router.post('/setup_client', setupClient);
router.post('/get_quotes', getQuotes);
// router.post('/execute_transaction', executeBridgeTransaction);
router.post('/transaction_status', getTransactionStatus);

export default router;
