import { mainnet, goerli, optimism } from '@wagmi/core/chains';
import { configureChains } from 'wagmi';
import { CoinbaseWalletConnector } from 'wagmi/connectors/coinbaseWallet';
import { MetaMaskConnector } from 'wagmi/connectors/metaMask';
import { WalletConnectConnector } from 'wagmi/connectors/walletConnect';
import { publicProvider } from 'wagmi/providers/public';

const defaultChains = [mainnet, goerli];
// Configure chains for connectors to support
const { chains } = configureChains(defaultChains, [publicProvider()]);

// Set up connectors
export const connectors = [
  new CoinbaseWalletConnector({
    chains,
    options: {
      appName: 'wagmi.sh',
      jsonRpcUrl: 'https://eth-mainnet.alchemyapi.io/v2/yourAlchemyId',
    },
  }),
  new MetaMaskConnector({
    chains: [mainnet, optimism],
    options: {
      shimDisconnect: true,
      UNSTABLE_shimOnConnectSelectAccount: true,
    },
  }),
  new WalletConnectConnector({
    chains,
    options: {
      projectId: 'e505ed7093cf895afec588107ad5d512',
      showQrModal: true,
    },
  }),
];
