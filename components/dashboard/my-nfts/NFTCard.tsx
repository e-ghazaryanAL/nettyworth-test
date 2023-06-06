import { IAssets } from '../../../redux/wallet/model';

type NFTCardProps = {
  asset: IAssets;
  ethUSDValue: number;
};

const NFTCard: React.FC<NFTCardProps> = ({ asset, ethUSDValue }) => {
  return (
    <div className='relative bg-light-blue-grey px-[6px] max-w-[176px] border rounded flex flex-col pb-[10px] h-full'>
      {/* <div className='absolute left-0 top-5 bg-dark-mode-light'>
        <span className='text-white text-[10px] font-medium px-[13px] py-[4px]'>Rarity {typeof asset.rarity === 'number' && (asset.rarity * 1000).toFixed(2)}</span>
      </div> */}
      <div className='mt-1'>
        <img src={asset.imageUrl} className='w-[165px] h-[165px] rounded-sm object-cover' alt='img' />
      </div>
      <div className='flex flex-col justify-between h-full'>
        <p className='text-sm text-dark-blue break-all mt-[4px]'>{asset.name}</p>
        <div className='flex justify-center pt-1'>
          <div className='flex flex-col items-center'>
            <span className='text-[10px] font-medium'>Floor</span>
            <span className='text-primary font-medium'>${asset.floor ? Math.round(+asset.floor * ethUSDValue) : 0}</span>
          </div>
        </div>
        {/* <div className='flex flex-col'>
        <span className='text-[8px]'>Trait Value</span>
        <span className='text-primary'>$0</span>
      </div> */}
      </div>
    </div>
  );
};

export default NFTCard;
