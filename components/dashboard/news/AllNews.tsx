import { usePathname, useRouter } from 'next/navigation';

import CryptoNewsHeading from './CryptoNewsHeading';
import CryptoNewsList from './CryptoNewsList';
import { NewsList } from './NewsList';
import { NewsListButtons } from './NewsListButtons';
import { NewsListingHeading } from './NewsListingHeading';

type AllNewsProps = {
  categoryId: number;
  pathname?: string;
  cryptonews?: boolean;
};
const AllNews: React.FC<AllNewsProps> = ({ categoryId, cryptonews }) => {
  const router = useRouter();
  const pathname = usePathname();

  const handleNavigateDetails = (slug: string) => {
    router.push(`${pathname}/${slug}`);
  };

  return (
    <div>
      <NewsListButtons categoryId={categoryId} />
      {cryptonews ? (
        <>
          <CryptoNewsHeading />
          <div className='flex px-8 pt-[47px] bg-light-blue-grey border-t-[1px] pb-20 md:pb-8'>
            <CryptoNewsList categoryId={categoryId} key={categoryId} />
          </div>
        </>
      ) : (
        <>
          <NewsListingHeading handleNavigateDetails={handleNavigateDetails} />
          <div className='flex px-8 pt-[47px] bg-light-blue-grey border-t-[1px] pb-20 md:pb-8'>
            <NewsList categoryId={categoryId} key={categoryId} handleNavigate={handleNavigateDetails} />
          </div>
        </>
      )}
    </div>
  );
};

export { AllNews };
