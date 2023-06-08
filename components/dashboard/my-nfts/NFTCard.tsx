import { Asset } from '../../../redux/top-sales/upshotmodel';
import { USDDollarFormatter } from '../../../utils/formatter';

type NFTCardProps = {
  asset: Asset & { floor: number; traitFloor: number };
};

const NFTCard: React.FC<NFTCardProps> = ({ asset }) => {
  return (
    <div className='relative bg-light-blue-grey px-[6px] max-w-[176px] border rounded flex flex-col pb-[10px] h-full'>
      <div className='absolute left-0 top-5 bg-dark-mode-light'>
        <span className='text-white text-[10px] font-medium px-[13px] py-[4px]'>Rarity {asset.rarity_rank}</span>
      </div>
      <div className='mt-1'>
        <img src={asset.original_media_url || '/placeholder.png'} className='w-[165px] h-[165px] rounded-sm object-cover' alt='img' />
      </div>
      <div className='flex flex-col justify-between h-full'>
        <p className='text-sm text-dark-blue break-all mt-[4px]'>{asset.name || asset.collection.name}</p>
        <div className='flex justify-between items-center pt-1'>
          <div className='flex flex-col items-center'>
            <span className='text-[10px] font-medium'>Floor</span>
            <span className='text-primary font-medium'>{asset?.floor ? USDDollarFormatter(asset.floor) : 'N/A'}</span>
          </div>
          <div className='flex flex-col items-center'>
            <span className='text-[10px] font-medium'>Trait Value</span>
            <span className='text-primary font-medium'>{asset?.traitFloor ? USDDollarFormatter(asset.traitFloor) : 'N/A'}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NFTCard;
