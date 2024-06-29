import { createConfig, EVM } from '@lifi/sdk';
import type { Chain } from 'viem';
import { createWalletClient, http } from 'viem';
import { privateKeyToAccount } from 'viem/accounts';
import { arbitrum, mainnet, optimism, polygon, scroll } from 'viem/chains';

const chains = [arbitrum, mainnet, optimism, polygon, scroll];

export async function configureClient(privateKey: string, chainId: number) {
  const account = privateKeyToAccount(`0x${privateKey}`);

  const chain = chains.find((chain) => chain.id === chainId);
  if (!chain) {
    throw new Error(`Chain with id ${chainId} not found`);
  }

  const client = createWalletClient({
    account,
    chain,
    transport: http(),
  });

  await createConfig({
    integrator: 'BridgeFunds',
    providers: [
      EVM({
        getWalletClient: async () => client,
        switchChain: async (newChainId) => {
          const newChain = chains.find((chain) => chain.id == newChainId);
          if (!newChain) {
            throw new Error(`Chain with id ${newChainId} not found`);
          }
          return createWalletClient({
            account,
            chain: newChain,
            transport: http(),
          });
        },
      }),
    ],
  });

  return client;
}