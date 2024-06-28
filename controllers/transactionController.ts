import { Request, Response } from 'express';
import { fetchQuote, fetchTransactionStatus, QuoteRequestBody, TransactionStatusRequestBody } from '../models/models';
import { configureClient } from '../config/config';

// Setup wallet client
export const setupClient = (req: Request, res: Response) => {
    const { privateKey } = req.body;
  
    if (!privateKey) {
      return res.status(400).json({ error: 'Private key is required' });
    }
  
    try {
      const client = configureClient(privateKey);
      res.json({ message: 'Client configured successfully', client });
    } catch (error: unknown) {
      if (error instanceof Error) {
        res.status(500).json({ error: error.message });
      } else {
        res.status(500).json({ error: 'Unknown error' });
      }
    }
  };

// Get quotes for a transaction
export async function getQuotes(req: Request, res: Response) {
  const { fromAddress, fromChain, toChain, fromToken, toToken, fromAmount }: QuoteRequestBody = req.body;
  try {
    const quotes = await fetchQuote({ fromAddress, fromChain, toChain, fromToken, toToken, fromAmount });
    res.json(quotes);
  } catch (error: unknown) {
    if (error instanceof Error) {
      res.status(500).json({ error: error.message });
    } else {
      res.status(500).json({ error: 'Unknown error' });
    }
  }
}

// export async function executeBridgeTransaction(req: Request, res: Response) {
//   const { fromChainId, toChainId, fromTokenAddress, toTokenAddress, fromAmount, fromAddress }: TransactionRequestBody = req.body;
//   try {
//     const transaction = await executeTransaction({ fromChainId, toChainId, fromTokenAddress, toTokenAddress, fromAmount, fromAddress });
//     res.json(transaction);
//   } catch (error: unknown) {
//     if (error instanceof Error) {
//       res.status(500).json({ error: error.message });
//     } else {
//       res.status(500).json({ error: 'Unknown error' });
//     }
//   }
// }

// Get transaction status
export async function getTransactionStatus(req: Request, res: Response) {
  const { txHash }: TransactionStatusRequestBody = req.body;
  try {
    const status = await fetchTransactionStatus({ txHash });
    res.json(status);
  } catch (error: unknown) {
    if (error instanceof Error) {
      res.status(500).json({ error: error.message });
    } else {
      res.status(500).json({ error: 'Unknown error' });
    }
  }
}
