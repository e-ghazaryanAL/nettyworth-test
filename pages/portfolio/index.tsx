import React, { useEffect } from 'react';

import { usePathname } from 'next/navigation';
import { useAccount, useConnect } from 'wagmi';

import { getEthCurrency, getWalletBalance, getWalletTotalCost, getWalletUpshot } from '../../api/api';
import { ConnectWallet } from '../../components/dashboard/portfolio/ConnectWallet';
import { DashboardSidebar } from '../../components/dashboard/portfolio/DashboardSidebar';
import { NFTCollection } from '../../components/dashboard/portfolio/NFTCollection';
import { LatestNews } from '../../components/dashboard/portfolio/PortfolioNews';
import PortfolioStats from '../../components/dashboard/portfolio/PortfolioStats';
import { useAppDispatch } from '../../hooks/redux';
import useScreenSize from '../../hooks/useScreenSize';
import { setShowAnimation } from '../../redux/auth/authSlice';
import { Asset } from '../../redux/top-sales/upshotmodel';
import { IUpshotStats } from '../../redux/wallet/model';
import { getWalletDetail, setLoading } from '../../redux/wallet/userSlice';
import { PrivateRoute } from '../../utils/auth';
import { hexToETh } from '../../utils/formatter';

const DashboardPortfolio: React.FC = () => {
  const { connect, connectors } = useConnect();
  const { isConnected, address } = useAccount();
  const { screenWidth } = useScreenSize();
  const mobileView = screenWidth < 1280;
  const dispatch = useAppDispatch();
  const pathname = usePathname();
  const connectWalletHandler = async (providerNum: number) => {
    connect({ connector: connectors[providerNum] });
    setShowAnimation(true);
  };

  useEffect(() => {
    document.body.className = 'docBody';

    const fetchWalletsDetail = async () => {
      dispatch(setLoading(true));
      if (address) {
        const walletEthBalance = await getWalletBalance(address);
        const EthPrice = await getEthCurrency();
        const convertedEthBalance = hexToETh(walletEthBalance);
        const ethUsdValue = EthPrice?.ethusd ? convertedEthBalance * Number(EthPrice?.ethusd) : 0;
        const walletNFTPnL = await getWalletTotalCost(address, 'usd', true);
        const walletOwnedAssets = await getWalletUpshot<{ assets: Asset[] }>(
          {
            walletAddress: address,
            limit: 12,
            sort_direction: 'DESC',
            sort_order: 'appraisal_wei',
          },
          'assets/owned'
        );

        const walletCollectionCount = await getWalletUpshot<IUpshotStats>(
          {
            walletAddress: address,
          },
          'stats'
        );
        const NFTValue = walletCollectionCount?.portfolio_value_wei ? hexToETh(walletCollectionCount.portfolio_value_wei) * Number(EthPrice.ethusd) : 0;
        const nettyWorth = NFTValue + ethUsdValue;
        const totalProfit = NFTValue - walletNFTPnL.tokens_held_cost_basis;
        dispatch(
          getWalletDetail({
            address,
            ethbalance: convertedEthBalance,
            ethUsdValue,
            nftCount: walletCollectionCount?.num_assets_owned || 0,
            nftCollectionCount: walletCollectionCount?.num_collections_owned || 0,
            ethUSD: EthPrice?.ethusd,
            ownedAssets: walletOwnedAssets?.assets,
            totalCost: walletNFTPnL.tokens_held_cost_basis,
            nettyWorth,
            NFTValue,
            totalProfit,
          })
        );
      }

      dispatch(setLoading(false));
    };
    if (isConnected) {
      fetchWalletsDetail();
    }

    return () => {
      document.body.classList.remove('docBody');
    };
  }, [address]);

  return (
    <div>
      <div className={`${pathname !== '/' ? 'xl:pb-[50px]' : 'xl:pb-0'} flex flex-col pb-20  xl:flex-row dark:xl:pb-0`}>
        <div className=' border-light-gray xl:w-[70%] xl:border-r xl:overflow-y-auto xl:h-screen scrollbar-hide'>
          {isConnected ? (
            <>
              <PortfolioStats />
              <NFTCollection />
            </>
          ) : (
            <div className='pt-3 px-5'>
              <h4 className='mb-3 font-semibold leading-[42px]'>Portfolio</h4>
              <ConnectWallet connectWallet={connectWalletHandler} bgColor='bg-primary' />
            </div>
          )}

          <div className='xl:hidden'>{mobileView && <DashboardSidebar />}</div>
          <LatestNews />
        </div>
        <div className='xl:w-[30%] bg-light-gray hidden xl:block xl:overflow-y-auto xl:h-screen scrollbar-hide md:pb-[69px]'>
          <DashboardSidebar />
        </div>
      </div>
    </div>
  );
};

export const getServerSideProps = PrivateRoute;

export default DashboardPortfolio;
