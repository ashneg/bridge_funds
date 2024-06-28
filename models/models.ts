import { getQuote, executeRoute, getStatus } from '@lifi/sdk'; // Adjust based on actual SDK usage

export interface QuoteRequestBody {
  fromChain: string;
  toChain: string;
  fromToken: string;
  toToken: string;
  fromAmount: string;
  fromAddress: string;
}

export interface TransactionRequestBody {
  fromChainId: number;
  toChainId: number;
  fromTokenAddress: string;
  toTokenAddress: string;
  fromAmount: string;
  fromAddress: string;
  executionPriority?: number;
}

export interface TransactionStatusRequestBody {
  txHash: string;
  bridge?: string;
  fromChain?: number | string;
  toChain?: number | string;
}

export async function fetchQuote(data: QuoteRequestBody) {
  const quotes = await getQuote({
    fromChain: parseInt(data.fromChain),
    toChain: parseInt(data.toChain),
    fromToken: data.fromToken,
    toToken: data.toToken,
    fromAmount: data.fromAmount,
    fromAddress: data.fromAddress,
  });
  return quotes;
}

// export async function executeTransaction(data: TransactionRequestBody) {
//   const availableRoute = await getQuote({
//     fromChain: data.fromChainId,
//     toChain: data.toChainId,
//     fromToken: data.fromTokenAddress,
//     toToken: data.toTokenAddress,
//     fromAmount: data.fromAmount,
//     fromAddress: data.fromAddress,
//   });

//   const executedRoute = await executeRoute(availableRoute, {
//     // Gets called once the route object gets new updates
//     updateRouteHook(availableRoute) {
//       console.log(executeRoute);
//     },
//   });

//   const uniqueId = Math.floor(Math.random() * 1000000);

//   const transaction = await executeRoute({
//     id: uniqueId.toString(),
//     fromAmountUSD: '10',
//     fromChainId: data.fromChainId,
//     toChainId: data.toChainId,
//     fromAddress: data.fromTokenAddress,
//     toAddress: data.toTokenAddress,
//     fromAmount: data.fromAmount,
//     insurance: '',
//     fromToken: '',
//     toAmountUSD: '',
//     toAmount: '',
//   });

//   return transaction;
// }

export async function fetchTransactionStatus(data: TransactionStatusRequestBody) {
  const status = await getStatus({
    txHash: data.txHash,
  });
  return status;
}
