import { ReactElement, ReactNode } from 'react';

import { library, config } from '@fortawesome/fontawesome-svg-core';
import '@fortawesome/fontawesome-svg-core/styles.css';
import { fab } from '@fortawesome/free-brands-svg-icons';
import { mainnet, polygon } from '@wagmi/core/chains';
import { publicProvider } from '@wagmi/core/providers/public';
import { NextPage } from 'next';
import { AppProps } from 'next/app';
import { Poppins } from 'next/font/google';
import Head from 'next/head';
import { SessionProvider } from 'next-auth/react';
import NextNProgress from 'nextjs-progressbar';
import '../index.css';
import '../styles/globals.css';
import '../styles/theme.scss';
import '../components/layouts-and-navs/index.css';
import { Provider } from 'react-redux';
import { WagmiConfig, configureChains, createConfig } from 'wagmi';
import { jsonRpcProvider } from 'wagmi/providers/jsonRpc';

import { QUICKNODE_URL } from '../api/api';
import { connectors } from '../api/connectors';
import GeneralLayout from '../components/layouts-and-navs/landing/GeneralLayout';
import { wrapper } from '../redux/store';

library.add(fab);
config.autoAddCss = false;

const { publicClient } = configureChains(
  [mainnet, polygon],
  [
    jsonRpcProvider({
      rpc: () => ({
        http: QUICKNODE_URL,
      }),
    }),
    publicProvider(),
  ]
);
const client = createConfig({
  autoConnect: true,
  publicClient,
  connectors,
});
const poppins = Poppins({
  subsets: ['latin'],
  weight: ['100', '200', '300', '400', '500', '600', '700', '800', '900'],
  display: 'swap',
  variable: '--font-poppins',
});

export type NextPageWithLayout<P = {}, IP = P> = NextPage<P, IP> & {
  getLayout?: (page: ReactElement) => ReactNode;
};

type AppPropsWithLayout = AppProps & {
  Component: NextPageWithLayout;
};

function MyApp({ Component, ...rest }: AppPropsWithLayout) {
  const { store, props } = wrapper.useWrappedStore(rest);
  const { pageProps, session } = props;

  const getLayout = Component.getLayout || ((page: ReactElement) => <GeneralLayout>{page}</GeneralLayout>);

  return (
    <>
      <NextNProgress></NextNProgress>
      <div>
        <Head>
          <meta name='viewport' content='width=device-width, initial-scale=1' />
          <meta name='theme-color' content='#000000' />
        </Head>
        <SessionProvider session={session}>
          <Provider store={store}>
            <div className={poppins.className}>
              <WagmiConfig config={client}>{getLayout(<Component {...pageProps} />)}</WagmiConfig>
            </div>
          </Provider>
        </SessionProvider>
      </div>
    </>
  );
}

MyApp.getInitialProps = wrapper.getInitialPageProps(() => () => {});

export default MyApp;
