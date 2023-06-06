import RightIcon from '../../../assets/icons/icon-arrow-right.svg';

interface IList {
  data: any;
  title: string;
}
const List: React.FC<IList> = ({ data, title }) => {
  return (
    <div className='py-2 border border-light-gray rounded mt-4 bg-white'>
      <p className='text-xs leading-6 px-4 text-dark-blue'>{title}</p>
      {data.map((item: any, idx: any) => {
        return (
          <div className='border-t-[1px] border-lighter-gray px-6 py-2' key={idx}>
            <div className='flex justify-between items-center'>
              <div className='flex justify-center items-center gap-3'>
                <div className='w-[26px] h-[26px]'>
                  <img src={item.img ?? item.thumbnail} alt='photo' className='rounded' />
                </div>
                <div>
                  <span className='block text-dark-blue'>{item.name ?? item.text}</span>
                  <span className='block text-primary'>{item.units}</span>
                </div>
              </div>
              <div>
                <RightIcon fill='#006FFF' />
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
};
export default List;
