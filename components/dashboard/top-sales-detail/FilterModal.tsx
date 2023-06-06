import { TopSalesDetailFilter } from './TopSalesDetailFilter';

type FilterModalProps = {
  clearFilter: () => void;
  filterHandler: (category: string, val: string) => void;
  isOpen: boolean;
  search: (e: React.ChangeEvent<HTMLInputElement>) => void;
  searchvalue: string;
};
const FilterModal: React.FC<FilterModalProps> = ({ isOpen, filterHandler, clearFilter, search, searchvalue }) => {
  return (
    <div className={`${isOpen ? 'block' : 'hidden'}  pt-20 fixed backdrop-blur-[273px] top-0 left-0 right-0 bottom-0 flex flex-col gap-[10px] justify-center items-center md:hidden z-[70]`}>
      <TopSalesDetailFilter searchvalue={searchvalue} search={search} clearFilter={clearFilter} filter={filterHandler} />
    </div>
  );
};

export { FilterModal };
