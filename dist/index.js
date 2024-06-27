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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const sdk_1 = require("@lifi/sdk"); // Adjust based on actual SDK usage
const app = (0, express_1.default)();
const port = 3001;
app.use(express_1.default.json());
// Route to get quotes for a bridge transaction
app.post('/get_quotes', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { fromAddress, fromChain, toChain, fromToken, toToken, fromAmount } = req.body;
    try {
        const quotes = yield (0, sdk_1.getQuote)({
            fromChain: parseInt(fromChain),
            toChain: parseInt(toChain),
            fromToken,
            toToken,
            fromAmount,
            fromAddress,
        });
        res.json(quotes);
    }
    catch (error) {
        if (error instanceof Error) {
            res.status(500).json({ error: error.message });
        }
        else {
            res.status(500).json({ error: 'Unknown error' });
        }
    }
}));
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
app.post('/transaction_status', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { txHash, bridge, toChain, fromChain } = req.body;
    try {
        const status = yield (0, sdk_1.getStatus)({
            txHash: txHash
        });
        res.json(status);
    }
    catch (error) {
        if (error instanceof Error) {
            res.status(500).json({ error: error.message });
        }
        else {
            res.status(500).json({ error: 'Unknown error' });
        }
    }
}));
app.listen(port, () => {
    console.log(`Li-Fi API listening at http://localhost:${port}`);
});
