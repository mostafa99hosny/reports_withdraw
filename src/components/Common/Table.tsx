import React from 'react';
interface TableColumn {
  header: string;
  accessor: string;
  render?: (value: any, row: any) => React.ReactNode;
}
interface TableProps {
  columns: TableColumn[];
  data: any[];
  selectable?: boolean;
  selectedRows?: number[];
  onRowSelect?: (rowId: number) => void;
  onSelectAll?: () => void;
}
const Table: React.FC<TableProps> = ({
  columns,
  data,
  selectable = false,
  selectedRows = [],
  onRowSelect,
  onSelectAll
}) => {
  const allSelected = data.length > 0 && selectedRows.length === data.length;
  const someSelected = selectedRows.length > 0 && selectedRows.length < data.length;

  return <div className="overflow-hidden shadow-sm rounded-lg border border-gray-200">
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              {selectable && <th scope="col" className="relative px-6 py-3 text-right">
                  <input 
                    type="checkbox" 
                    className="h-4 w-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500" 
                    checked={allSelected}
                    ref={(input) => {
                      if (input) input.indeterminate = someSelected;
                    }}
                    onChange={onSelectAll} 
                  />
                </th>}
              {columns.map((column, index) => <th key={index} scope="col" className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                  {column.header}
                </th>)}
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {data.length === 0 ? (
              <tr>
                <td colSpan={columns.length + (selectable ? 1 : 0)} className="px-6 py-12 text-center text-sm text-gray-500">
                  <div className="flex flex-col items-center">
                    <svg className="h-12 w-12 text-gray-400 mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                    </svg>
                    <p className="text-lg font-medium text-gray-900 mb-1">لا توجد تقارير</p>
                    <p className="text-gray-500">لم يتم العثور على أي تقارير تطابق معايير البحث</p>
                  </div>
                </td>
              </tr>
            ) : (
              data.map((row, rowIndex) => <tr key={rowIndex} className={`${selectedRows.includes(rowIndex) ? 'bg-blue-50 border-blue-200' : rowIndex % 2 === 0 ? 'bg-white' : 'bg-gray-50'} hover:bg-gray-100 transition-colors duration-150`}>
                  {selectable && <td className="px-6 py-4 whitespace-nowrap">
                      <input 
                        type="checkbox" 
                        className="h-4 w-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500" 
                        checked={selectedRows.includes(rowIndex)} 
                        onChange={() => onRowSelect && onRowSelect(rowIndex)} 
                      />
                    </td>}
                  {columns.map((column, colIndex) => <td key={colIndex} className="px-6 py-4 text-sm">
                      {column.render ? column.render(row[column.accessor], row) : row[column.accessor]}
                    </td>)}
                </tr>)
            )}
          </tbody>
        </table>
      </div>
    </div>;
};
export default Table;