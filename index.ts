import express, { Request, Response } from 'express';
import {getQuote, executeRoute, getStatus} from '@lifi/sdk'; // Adjust based on actual SDK usage

const app = express();
const port = 3001;

app.use(express.json());

// const lifi = new LiFiSDK({}); 
interface QuoteRequestBody {
    fromChain: string;
    toChain: string;
    fromToken: string;
    toToken: string;  
    fromAmount: string;
    fromAddress: string;
}

interface TransactionRequestBody {
    fromChainId: number;
    toChainId: number;
    fromTokenAddress: string;
    toTokenAddress: string;
    fromAmount: string;
    fromAddress: string;
}

interface TransactionStatusRequestBody {
    txHash: string;
    bridge?: string;
    fromChain?: number | string;
    toChain?: number | string;

}

// Route to get quotes for a bridge transaction
app.post('/get_quotes', async (req: Request, res: Response) => {
  const { fromAddress, fromChain, toChain, fromToken, toToken, fromAmount }: QuoteRequestBody = req.body;
  try {
    const quotes = await getQuote({
        fromChain: parseInt(fromChain),
        toChain: parseInt(toChain),
        fromToken,
        toToken,
        fromAmount,
        fromAddress,
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
// app.post('/execute_transaction', async (req: Request, res: Response) => {
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

// Route to get the status of a bridge transaction
app.post('/transaction_status', async (req: Request, res: Response) => {
    const { txHash, bridge, toChain, fromChain }: TransactionStatusRequestBody = req.body;
  try {
    const status = await getStatus(
        {
            txHash: txHash
        }
    );
    res.json(status);
  } catch (error: unknown) {
    if (error instanceof Error) {
      res.status(500).json({ error: error.message });
    } else {
      res.status(500).json({ error: 'Unknown error' });
    }
  }
});

app.listen(port, () => {
  console.log(`Li-Fi API listening at http://localhost:${port}`);
});
