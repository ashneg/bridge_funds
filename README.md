# bridge_funds


endpoints: 

Request body

{
    "fromChain": 42161, // Arbitrum
    "toChain": 10, // Optimism
    "fromToken": "0xaf88d065e77c8cC2239327C5EDb3A432268e5831", // USDC on Arbitrum
    "toToken": "0xDA10009cBd5D07dd0CeCc66161FC93D7c9000da1", // DAI on Optimism
    "fromAmount": "10000000", // 10 USDC
    // The address from which the tokens are being transferred.
    "fromAddress": "0x552008c0f6870c2f77e5cC1d2eb9bdff03e30Ea0"
}
