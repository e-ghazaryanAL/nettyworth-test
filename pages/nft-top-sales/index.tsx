import { useEffect, useState } from 'react';

import { useSession } from 'next-auth/react';

import { getUserNFTFav } from '../../api/api';
import Heart from '../../assets/icons/icon-fav-heart.svg';
import { Paginataion } from '../../components/dashboard/news/Pagination';
import { FilteredButtons } from '../../components/dashboard/top-sales/FilteredButtons';
import { TopSalesBox } from '../../components/dashboard/top-sales/TopSalesBox';
import { TopSalesHeading } from '../../components/dashboard/top-sales/TopSalesHeading';
import { TopSalesTable } from '../../components/dashboard/top-sales/TopSalesTable';
import { Loader } from '../../components/Loader';
import { useAppDispatch, useAppSelector } from '../../hooks/redux';
import useFavourite from '../../hooks/useFavourites';
import usePaginate from '../../hooks/usePaginate';
import { fetchCollectionsByPage } from '../../redux/top-sales/topSalesSlice';
import { hexToETh, kFormatter } from '../../utils/formatter';

const filteredButtons = [
  { id: 0, title: 'All NFTs' },
  // { id: 1, title: 'Blue Chip' },
  // { id: 2, title: 'Mid Cap' },
  // { id: 3, title: 'Small Cap' },
];

const TopSalesPage = () => {
  const { loading, selectedDate, NftTopSalesCollections } = useAppSelector((state) => state.sales);
  const { handlePageClick, pageNumber, setPageNumber } = usePaginate();
  const dispatch = useAppDispatch();
  const [listBoxActive, setListBoxActive] = useState(0);
  const [view, setView] = useState<string>('list');
  const { favorites, handleLikeToggle, setFavorites } = useFavourite();
  const [tableData, setTableData] = useState<any[] | []>([]);
  const { data: session } = useSession();
  const limit = 20;
  const totalPages = 100;

  const handleFilter = (id: number) => {
    setListBoxActive(id);
  };

  const handleNavigateDetails = () => {
    // navigate({ pathname: `/nft-top-sales/${slug}` });
  };
  const handlePrev = () => {
    if (pageNumber - 1 > 0) {
      setPageNumber((prev) => prev - 1);
    }
  };
  const handleNext = () => {
    if (pageNumber < totalPages) {
      setPageNumber((prev) => prev + 1);
    }
  };

  useEffect(() => {
    dispatch(
      fetchCollectionsByPage({
        limit,
        offset: (pageNumber - 1) * limit,
      })
    );
  }, [pageNumber]);

  useEffect(() => {
    if (session?.user) {
      const getNFTfavorites = async () => {
        const res = await getUserNFTFav<{ itemId: string }[]>();
        const converted = res.map((nft) => nft.itemId);
        setFavorites(new Set(converted));
      };
      getNFTfavorites();
    }
  }, [favorites.size]);

  useEffect(() => {
    if (NftTopSalesCollections?.collections) {
      const convertedData = NftTopSalesCollections?.collections?.map((nft, i) => {
        return {
          change: nft.volume.change[`wei_${selectedDate}` as keyof typeof nft.volume.change],
          volume: Math.round(hexToETh(nft.volume[`wei_${selectedDate}` as keyof typeof nft.volume])),
          ...(session?.user && {
            heart: (
              <button onClick={(e) => handleLikeToggle(e, { category: 'NFTSales', itemId: nft.contract_address })}>
                <Heart fill={`${favorites.has(nft.contract_address) ? '#ff066a' : '#A9B0C4'}`} className='w-4 h-4' />
              </button>
            ),
          }),
          collection: (
            <div className='flex items-center max-w-[300px] text-xs md:text-sm'>
              <img className='h-10 w-10 object-cover mr-4 inline-block rounded-full' src={nft.banner_image_url || 'placeholder.png'} />
              {nft.name}
            </div>
          ),
          floorPrice: nft.floor.wei ? hexToETh(nft.floor.wei).toFixed(2) : 'N/A',
          sales: nft.num_sales[`num_${selectedDate}` as keyof typeof nft.num_sales],
          uniqueOwners: (
            <span className='font-medium text-sm text-[#465272]'>
              {nft.num_owners ? `${kFormatter(Number(nft.num_owners))}k` : 'N/A'} <br />
              {/* {uniqueOwners ? `${Math.round(uniqueOwners * 100)}%` : ''} */}
            </span>
          ),
          slug: nft.slug,
          id: <span className='text-[22px] font-bold text-input'>{(pageNumber - 1) * limit + i + 1}</span>,
          owners: kFormatter(Number(nft.num_owners)),
          uniquePercent: 'N/A',
          itemsListed: nft.num_listed,
          name: nft.name,
          image: nft.banner_image_url || 'placeholder.png',
        };
      });
      setTableData(convertedData);
    }
  }, [NftTopSalesCollections, selectedDate, favorites.size]);
  return (
    <div className='pt-5 bg-white flex flex-col pb-20 max-w-[1300px] 2xl:mx-auto md:pb-8'>
      <TopSalesHeading title='Top Sales' text='View the latest top NFT sales on NettyWorth, ranked by volume, floor price, and holders. You can search for the most popular NFTs on the market, analyze trends and get the data you need from the best NFT platform.' />
      <FilteredButtons filteredButtons={filteredButtons} view={view} listBoxActive={listBoxActive} handleFilter={handleFilter} setView={setView} />
      {!tableData?.length && loading ? <Loader /> : view === 'list' ? <TopSalesTable data={tableData} handleNavigateDetails={handleNavigateDetails} /> : <TopSalesBox data={tableData} handleNavigateDetails={handleNavigateDetails} />}
      <Paginataion className='justify-center mt-2 hidden md:flex' totalPages={100 || 1} handlePageClick={handlePageClick} />
      <div className='flex md:hidden justify-center items-center gap-3'>
        <button className={`${pageNumber - 1 < 1 ? 'bg-[#465272]' : 'bg-primary-blue'} max-w-[150px] w-full md:hidden rounded text-white font-semibold h-[50px] text-base leading-6 flex justify-center items-center`} onClick={handlePrev}>
          Previous
        </button>
        <button className={`${pageNumber === 100 ? 'bg-[#465272]' : 'bg-primary-blue'} max-w-[150px] w-full md:hidden rounded text-white font-semibold h-[50px] bg-primary-blue text-base leading-6 flex justify-center items-center`} onClick={handleNext}>
          Next
        </button>
      </div>
    </div>
  );
};

export default TopSalesPage;
