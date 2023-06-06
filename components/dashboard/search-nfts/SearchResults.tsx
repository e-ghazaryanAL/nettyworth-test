import { SyntheticEvent } from 'react';

import { Configure, Hits, Index } from 'react-instantsearch-dom';

import { HitArticleContent } from './ArticleContents';
import { HitNftsContent } from './NftsContent';

interface ISearchResults {
  modalHandler?: (e: SyntheticEvent<Element, Event>) => void;
}

const SearchResults: React.FC<ISearchResults> = ({ modalHandler }) => {
  return (
    <div className='p-0 md:p-[18px] pt-0 h-[573px] overflow-y-auto pb-52 scrollbar-hide'>
      <div className='flex flex-col gap-4'>
        <div className=' bg-white flex flex-col rounded' onClick={modalHandler}>
          <div className='border-b-2  border-lighter-gray pl-[18px] pt-[15px] pb-[11px]'>
            <span className='text-dark-blue'>NFTs</span>
          </div>
          <Index indexName='nfts'>
            <Configure hitsPerPage={5} />
            <Hits hitComponent={HitNftsContent} />
          </Index>
        </div>

        {/* <div className=' bg-white flex flex-col rounded'>
            <div className='border-b-2  border-lighter-gray pl-[18px] pt-[15px] pb-[11px]'>
              <span className='text-dark-blue'>Videos</span>
            </div>
            <div className='flex justify-between pl-[25px] py-[11px] pr-[21px] border-b-2  border-lighter-gray'>
              <div className='flex items-center'>
                <img src='/profile.jpg' alt='' className='w-[26px] h-[26px] rounded object-cover' />
                <div className='pl-3'>
                  <span className='text-dark-blue'>Ape</span>
                </div>
              </div>
              <RightIcon fill='#006FFF' />
            </div>
          </div> */}
        {/* <div className=' bg-white flex flex-col rounded'>
            <div className='border-b-2  border-lighter-gray pl-[18px] pt-[15px] pb-[11px]'>
              <span className='text-dark-blue'>Videos</span>
            </div>
            <div className='flex justify-between pl-[25px] py-[11px] pr-[21px] border-b-2  border-lighter-gray'>
              <div className='flex items-center'>
                <div className='w-[26px] h-[26px] bg-light-gray rounded flex items-center justify-center p-[6px]'>
                  <WebsiteIcon fill='#006FFF' />
                </div>

                <div className='pl-3'>
                  <span className='text-dark-blue'>A Quick Guide: VeeFriends NFT Collection</span>
                </div>
              </div>
              <RightIcon fill='#006FFF' />
            </div>
          </div> */}
        <div className=' bg-white/85 flex flex-col rounded' onClick={modalHandler}>
          <div className='border-b-2  border-lighter-gray pl-[18px] pt-[15px] pb-[11px]'>
            <span className='text-dark-blue'>Articles</span>
          </div>
          <Index indexName='news'>
            <Configure hitsPerPage={5} />
            <Hits hitComponent={HitArticleContent} />
          </Index>
        </div>
      </div>
    </div>
  );
};

export { SearchResults };
