import { Asset } from '../../../redux/top-sales/upshotmodel';

const TokenCard = ({ token }: { token: Asset }) => {
  return (
    <div className='relative bg-light-blue-grey max-w-[176px] border rounded flex flex-col pb-[10px] h-full'>
      <div className='absolute left-0 top-5 bg-dark-mode-light'>
        <span className='text-white text-[10px] font-medium px-[13px] py-[4px]'>Rarity {token.rarity_score}</span>
      </div>
      <div className='mt-1 px-[6px]'>
        <img src={token.original_media_url} className='w-[165px] h-[165px] rounded-sm object-cover' alt='img' />
      </div>
      <div className='flex flex-col justify-between h-full px-[6px]'>
        <p className='text-sm text-dark-blue break-all mt-[4px]'>{`${token.collection.name} #${token.token_id}`}</p>
        <div className='flex justify-between pt-1'>
          <div className='flex flex-col items-center'>
            <span className='text-[10px] font-medium'>Floor</span>
            <span className='text-primary font-medium'>N/A ETH</span>
          </div>
          <div className='flex flex-col'>
            <span className='text-[10px] font-medium'>Trait Value</span>
            <span className='text-primary font-medium'>N/A ETH</span>
          </div>
        </div>
      </div>
      <div className='mt-[9px] pt-[7px] border-t flex justify-center'>
        <a href={`https://opensea.io/assets/ethereum/${token.collection.id}/${token.token_id}`} rel='noreferrer' target='_blank' className='bg-light-gray rounded-sm w-[71px] h-[23px] flex justify-center items-center'>
          <span className='text-[9px] font-bold'>BUY NOW</span>
        </a>
      </div>
    </div>
  );
};
export default TokenCard;
