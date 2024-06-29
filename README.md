# bridge_funds

## Setup

- docker build -t bridge_funds .
- docker run -p 3001:3001 bridge_funds



## Endpoints

## 


endpoints: 

Request body

{
    "fromChainId": 42161, // Arbitrum
    "toChainId": 10, // Optimism
    "fromTokenAddress": "0xaf88d065e77c8cc2239327c5edb3a432268e5831", // USDC on Arbitrum
    "toTokenAddress": "0x0b2C639c533813f4Aa9D7837CAf62653d097Ff85", // DAI on Optimism
    "fromAmount": "1000000", // 10 USDC
    // The address from which the tokens are being transferred.
    "fromAddress": "0x76Ee52c095152525cF6f1aCb91C6a30E6Dc9a8b5"
}