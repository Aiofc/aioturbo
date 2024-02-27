"use client";
import React, { useState } from "react";
import {
  getCoreRowModel,
  useReactTable,
  getPaginationRowModel,
  getFilteredRowModel,
  getSortedRowModel,
  getFacetedRowModel,
  getFacetedUniqueValues,
  VisibilityState,
  ColumnFiltersState,
  SortingState,
} from "@tanstack/react-table";
import { TableCore } from "../../common/views/TableCore.tsx";
import {FacetedFilter, KnowledgeManageTableColumns, TableFilterProps} from "../../../types";
import { columns } from "./knowledge-table-column.tsx";
import { TableToolbar } from "../../common/views/TableToolbar.tsx";
import { Separator } from "../../ui/separator";
import { Button } from "../../ui/button";
import { ScrollArea, ScrollBar } from "../../ui/scroll-area";

interface KnowledgeManagerTableProps {
  data: KnowledgeManageTableColumns[];
}

export default function KnowledgeManagerTable({
  data,
}: KnowledgeManagerTableProps) {
  const [rowSelection, setRowSelection] = useState({});
  const [columnVisibility, setColumnVisibility] = useState<VisibilityState>({});
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);
  const [sorting, setSorting] = useState<SortingState>([]);
  const table = useReactTable({
    data,
    columns,
    state: {
      sorting,
      columnVisibility,
      rowSelection,
      columnFilters,
    },
    enableRowSelection: true,
    onRowSelectionChange: setRowSelection,
    onSortingChange: setSorting,
    onColumnFiltersChange: setColumnFilters,
    onColumnVisibilityChange: setColumnVisibility,
    getCoreRowModel: getCoreRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFacetedRowModel: getFacetedRowModel(),
    getFacetedUniqueValues: getFacetedUniqueValues(),
  });
  const tableFilter: TableFilterProps = {
    searchColum: "name",
    placeholder: "搜索知识库",
  };

  return (
    <div>
      <Separator />
      <TableToolbar
        className='mb-2 mt-2'
        table={table}
        tableFilter={tableFilter}
        create="/knowledge/create"
      />
      <ScrollArea className='rounded-md border h-[50vh]'>
        <TableCore table={table} columns={columns}/>
        <ScrollBar orientation='horizontal' />
      </ScrollArea>
      <div className="flex items-center justify-end space-x-2 py-4">
        <div className="flex-1 text-sm text-muted-foreground">
          {table.getFilteredSelectedRowModel().rows.length} of {' '}
          {table.getFilteredRowModel().rows.length} 条被选择.
        </div>
        <div className="space-x-2">
          <Button
            variant="outline"
            size="sm"
            onClick={() => table.previousPage()}
            disabled={!table.getCanPreviousPage()}
          >
            上一页
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={() => table.nextPage()}
            disabled={!table.getCanNextPage()}
          >
            下一页
          </Button>
        </div>
      </div>
    </div>
  );
}
