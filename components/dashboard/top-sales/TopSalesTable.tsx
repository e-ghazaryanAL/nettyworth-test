import { TableData } from './model';
import { TableUi } from './TableUi';

interface ITopSalesTable {
  data: TableData[];
  handleNavigateDetails: (id: string) => void;
}
const mobileColumns: String[] = ['collection', 'id', 'heart', 'floorPrice'];

export const columns = [
  {
    Header: '',
    accessor: 'heart',
  },
  {
    Header: '',
    accessor: 'id',
  },
  {
    Header: 'COLLECTION',
    accessor: 'collection',
  },
  {
    Header: 'VOLUME',
    accessor: 'volume',
  },
  {
    Header: '%CHANGE',
    accessor: 'change',
    Cell: (props: { value: number }) => {
      return <span className={`${props.value >= 0 ? ' text-change-color' : 'text-light-red'} text-sm font-medium`}>{Math.round(+props.value)}%</span>;
    },
    // @ts-ignore
    sortType: (rowA, rowB, columnId) => {
      const valueA = rowA.values[columnId];
      const valueB = rowB.values[columnId];
      return valueA > valueB ? 1 : -1;
    },
    sortDescFirst: true,
  },
  {
    Header: 'FLOOR PRICE',
    accessor: 'floorPrice',
  },
  {
    Header: 'SALES',
    accessor: 'sales',
  },
  {
    Header: '%UNIQUE OWNERS',
    accessor: 'uniqueOwners',
  },
  // {
  //   Header: '%ITEMS LISTED',
  //   accessor: 'itemsListed',
  // },
];

const TopSalesTable: React.FC<ITopSalesTable> = ({ data, handleNavigateDetails }) => {
  return (
    <div>
      <div className='hidden xl:block mt-9'>
        <TableUi handleNavigateDetails={handleNavigateDetails} columns={columns} data={data} />
      </div>
      <div className='block xl:hidden mt-9'>
        <TableUi
          data={data}
          handleNavigateDetails={handleNavigateDetails}
          columns={columns.filter((el) => {
            return mobileColumns.includes(el.accessor);
          })}
        />
      </div>
    </div>
  );
};

export { TopSalesTable };
