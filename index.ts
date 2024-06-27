import express, { Request, Response } from 'express';
import {getQuote, executeRoute, getStatus} from '@lifi/sdk'; // Adjust based on actual SDK usage

const app = express();
const port = 3001;

app.use(express.json());

// const lifi = new LiFiSDK({}); 

interface QuoteRequestBody {
  fromAddress: string;
  fromChain: string;
  toChain: string;
  fromToken: string;
  toToken: string;  
  fromAmount: string;
}

interface TransactionRequestBody {
    fromChainId: number;
    toChainId: number;
    fromTokenAddress: string;
    toTokenAddress: string;
    fromAmount: string;
    fromAddress: string;
}

// Route to get quotes for a bridge transaction
app.post('/get_quotes', async (req: Request, res: Response) => {
  const { fromAddress, fromChain, toChain, fromToken, toToken, fromAmount }: QuoteRequestBody = req.body;
  try {
    const quotes = await getQuote({
        fromAddress,
        fromChain,
        toChain,
        fromToken,
        toToken,
        fromAmount,
    });
    res.json(quotes);
  } catch (error: unknown) {
    if (error instanceof Error) {
      res.status(500).json({ error: error.message });
    } else {
      res.status(500).json({ error: 'Unknown error' });
    }
  }
});

// Route to execute a bridge transaction
// app.post('/execute-transaction', async (req: Request, res: Response) => {
//   const { fromChainId, toChainId, fromTokenAddress, toTokenAddress, fromAmount, fromAddress }: TransactionRequestBody = req.body;
//   try {
//     const route = {
        
//     }

//     const executedRoute = await executeRoute(route, {
//         // Gets called once the route object gets new updates
//         updateRouteHook(route) {
//           console.log(route)
//         },
//       })

//     res.json(executedRoute);

//     // const transaction = await executeRoute({
//     //     fromChainId,
//     //     toChainId,
//     //     fromTokenAddress,
//     //     fromAmount,
//     //     fromAddress,
//     // });
//     // res.json(transaction);
//   } catch (error: unknown) {
//     if (error instanceof Error) {
//       res.status(500).json({ error: error.message });
//     } else {
//       res.status(500).json({ error: 'Unknown error' });
//     }
//   }
// });

// Route to get the status of a transaction
// app.get('/transaction-status/:transactionId', async (req: Request, res: Response) => {
//   const { transactionId } = req.params;
//   try {
//     const status = await getStatus(transactionId);
//     res.json(status);
//   } catch (error: unknown) {
//     if (error instanceof Error) {
//       res.status(500).json({ error: error.message });
//     } else {
//       res.status(500).json({ error: 'Unknown error' });
//     }
//   }
// });

app.listen(port, () => {
  console.log(`Li-Fi API listening at http://localhost:${port}`);
});
