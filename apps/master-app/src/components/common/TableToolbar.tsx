'use client';

import { Cross2Icon } from '@radix-ui/react-icons';
import { Table } from '@tanstack/react-table';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { TableFacetedFilter } from './TableFacetedFilter';
import { TableViewOptions } from './TableViewOptions';
import { useRouter } from 'next/navigation';
import { FacetedFilter, TableFilterProps } from '../../types';

interface DataTableToolbarProps<TData> {
  table: Table<TData>;
  create?: string;
  className?: string;
  tableFilter?: TableFilterProps;
  facetedFilter?: FacetedFilter[];
}

export function TableToolbar<TData>({
  table,
  create,
  tableFilter,
  facetedFilter,
  className
}: DataTableToolbarProps<TData>) {
  const isFiltered = table.getState().columnFilters.length > 0;
  const router = useRouter();

  return (
    <div className={`flex items-center justify-between ${className?className:''}`}>
      {create ? (
        <Button onClick={() => router.push(create)} className=" h-8 mr-3">
          新增
        </Button>
      ) : (
        <div />
      )}
      <div className="flex flex-1 items-center space-x-2">
        {tableFilter ? (
          <Input
            placeholder={tableFilter.placeholder}
            value={(table.getColumn(tableFilter.searchColum)?.getFilterValue() as string) ?? ''}
            onChange={(event) =>
              table.getColumn(tableFilter.searchColum)?.setFilterValue(event.target.value)
            }
            className="h-8 w-[150px] lg:w-[250px]"
          />
        ) : (
          <div />
        )}
        {facetedFilter ? (
          facetedFilter.map((item, index) => {
            return (
              table.getColumn(item.column) && (
                <TableFacetedFilter
                  key={index}
                  column={table.getColumn(item.column)}
                  title={item.title}
                  options={item.options}
                />
              )
            );
          })
        ) : (
          <div />
        )}
        {isFiltered && (
          <Button
            variant="ghost"
            onClick={() => table.resetColumnFilters()}
            className="h-8 px-2 lg:px-3"
          >
            重置筛选
            <Cross2Icon className="ml-2 h-4 w-4" />
          </Button>
        )}
      </div>
      <TableViewOptions table={table} />
    </div>
  );
}
