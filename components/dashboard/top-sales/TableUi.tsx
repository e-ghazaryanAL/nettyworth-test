import { faArrowUp, faArrowDown } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
// import { Loader } from 'components/Loader';
import { useSortBy, useTable } from 'react-table';

interface ITableUI {
  columns: any[];
  data: any[];
  handleNavigateDetails: (slug: string, symbolId?: string, symbol?: string) => void;
  loading?: boolean;
  crypto?: boolean;
  dayColumnRef?: React.RefObject<HTMLDivElement>;
  weekColumnREf?: React.RefObject<HTMLDivElement>;
}

const TableUi: React.FC<ITableUI> = ({ columns, data, handleNavigateDetails, crypto, dayColumnRef, weekColumnREf }) => {
  const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } = useTable(
    {
      columns,
      data,
    },
    useSortBy
  );

  return (
    <table {...getTableProps()} className='w-full mb-10'>
      <thead>
        {headerGroups.map((headerGroup) => {
          const { key, ...groupProps } = headerGroup.getHeaderGroupProps();
          return (
            <tr key={key} {...groupProps}>
              {headerGroup.headers.map((column, i, arr) => {
                // @ts-ignore
                const { key: headerKey, ...headProps } = column.getHeaderProps(column.getSortByToggleProps());
                return (
                  <th key={headerKey} className={`relative pl-5 ${i !== 2 ? 'text-right' : 'text-left'} ${crypto && i === 1 && 'text-start'}`} {...headProps}>
                    {<span className={`inline-block text-[12px]  leading-6 text-input font-medium ${arr.length - 1 === i ? 'mr-12' : 'mr-6'}`}>{column.render('Header')}</span>}
                    {i >= 3 && (
                      <div className={`inline-block absolute top-1 ${arr.length - 1 === i ? 'right-6' : 'right-0'}`}>
                        {/* @ts-ignore */}
                        <div className='flex flex-col justify-start gap-[2px]' onClick={() => column.getSortByToggleProps()} ref={column.Header === '24H%' ? dayColumnRef : column.Header === '7D%' ? weekColumnREf : null}>
                          <FontAwesomeIcon className='font-black h-2  text-input' icon={faArrowUp} />
                          <FontAwesomeIcon className='font-black h-2  text-input' icon={faArrowDown} />
                        </div>
                      </div>
                    )}
                  </th>
                );
              })}
            </tr>
          );
        })}
      </thead>
      <tbody {...getTableBodyProps()}>
        {rows.map((row: any) => {
          prepareRow(row);

          const { key, ...rowProps } = row.getRowProps();
          return (
            <tr key={key} {...rowProps} className={`even:bg-light-blue-grey even:dark:bg-dark-mode-btn ${crypto ? 'cursor-pointer' : ''}`} onClick={() => (crypto ? handleNavigateDetails(row.original.slug, row.original.cryptoId, row.original.symbol) : handleNavigateDetails(row.original.slug))}>
              {row.cells.map((cell: any, i: number) => {
                const { key: cellKey, ...celProps } = cell.getCellProps();
                return (
                  <td key={cellKey} className={`text-sm font-medium text-input pt-[10px] first-of-type:pl-5 first-of-type:pr-5 pb-[10px] last:pr-6 ${i > 2 ? 'text-right' : 'text-left'} text-[#465272]`} {...celProps}>
                    {cell.render('Cell')}
                  </td>
                );
              })}
            </tr>
          );
        })}
      </tbody>
    </table>
  );
};

export { TableUi };
