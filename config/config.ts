import { createConfig, EVM } from '@lifi/sdk';
import type { Chain } from 'viem';
import { createWalletClient, http } from 'viem';
import { privateKeyToAccount } from 'viem/accounts';
import { arbitrum, mainnet, optimism, polygon, scroll } from 'viem/chains';

const chains = [arbitrum, mainnet, optimism, polygon, scroll];

export const configureClient = (privateKey: string) => {
  const account = privateKeyToAccount(`0x${privateKey}`);

  const client = createWalletClient({
    account,
    chain: mainnet,
    transport: http(),
  });

  createConfig({
    integrator: 'Bridge Funds',
    providers: [
      EVM({
        getWalletClient: async () => client,
        switchChain: async (chainId) =>
          // Switch chain by creating a new wallet client
          createWalletClient({
            account,
            chain: chains.find((chain) => chain.id == chainId) as Chain,
            transport: http(),
          }),
      }),
    ],
  });

  return client;
};
