"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.fetchQuote = fetchQuote;
exports.fetchTransactionStatus = fetchTransactionStatus;
const sdk_1 = require("@lifi/sdk"); // Adjust based on actual SDK usage
function fetchQuote(data) {
    return __awaiter(this, void 0, void 0, function* () {
        const quotes = yield (0, sdk_1.getQuote)({
            fromChain: parseInt(data.fromChain),
            toChain: parseInt(data.toChain),
            fromToken: data.fromToken,
            toToken: data.toToken,
            fromAmount: data.fromAmount,
            fromAddress: data.fromAddress,
        });
        return quotes;
    });
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
function fetchTransactionStatus(data) {
    return __awaiter(this, void 0, void 0, function* () {
        const status = yield (0, sdk_1.getStatus)({
            txHash: data.txHash,
        });
        return status;
    });
}
