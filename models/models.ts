import { getQuote, executeRoute, getStatus, _InsuranceState , Insurance, getRoutes} from '@lifi/sdk'; // Adjust based on actual SDK usage

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
  privateKey?: string;
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

export async function executeTransaction(data: TransactionRequestBody) {

  const availableRoute = await getRoutes({
    fromChainId: data.fromChainId,
    toChainId: data.toChainId,
    fromTokenAddress: data.fromTokenAddress,
    toTokenAddress: data.toTokenAddress,
    fromAmount: data.fromAmount,
    fromAddress: data.fromAddress,
  });

  const bestRoute = availableRoute.routes[0]

  const executedRoute = await executeRoute(bestRoute, {
    // Gets called once the route object gets new updates
    updateRouteHook(bestRoute) {
      console.log("===============Route updated==============");
      console.log(bestRoute);
      console.log("===============END========================");
    },
  });

  return executeRoute;
}

export async function fetchTransactionStatus(data: TransactionStatusRequestBody) {
  const status = await getStatus({
    txHash: data.txHash,
  });
  return status;
}
