import React from 'react'
import { ColumnDef } from '@tanstack/react-table';
import { KnowledgeManageTableColumns } from '../../types';
import { Button } from '../ui/button';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '../ui/dropdown-menu';
import { Checkbox } from '../ui/checkbox';
import { TableColumnHeader } from '../common/TableColumnHeader';


export const columns: ColumnDef<KnowledgeManageTableColumns>[] = [
  {
    id: "select",
    header: ({ table }) => (
      <Checkbox
        checked={
          table.getIsAllPageRowsSelected() ||
          (table.getIsSomePageRowsSelected() && "indeterminate")
        }
        onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
        aria-label="Select all"
        className="translate-y-[2px]"
      />
    ),
    cell: ({ row }) => (
      <Checkbox
        checked={row.getIsSelected()}
        onCheckedChange={(value) => row.toggleSelected(!!value)}
        aria-label="Select row"
        className="translate-y-[2px]"
      />
    ),
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: 'id',
    header: ({ column }) => (
      <TableColumnHeader column={column} title="ID"/>
    ),
    cell: ({ row }) => <div className="w-[80px] hidden">{row.getValue("id")}</div>,
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: 'title',
    header: ({ column }) => (
      <TableColumnHeader column={column} title="知识库名称" />
    ),
    cell: ({ row }) => <div className="w-[80px]">{row.getValue("title")}</div>,
    enableSorting: true,
    enableHiding: true,
  },
  {
    accessorKey: 'category',
    header: ({ column }) => (
      <TableColumnHeader column={column} title="分类" />
    ),
    cell: ({ row }) => <div className="w-[80px]">{row.getValue("category")}</div>,
    enableSorting: true,
    enableHiding: true,
  },
  {
    accessorKey: 'status',
    header: ({ column }) => (
      <TableColumnHeader column={column} title="状态" />
    ),
    cell: ({ row }) => <div className="w-[80px]">{row.getValue("status")}</div>,
    enableSorting: true,
    enableHiding: true,
  },
  {
    accessorKey: 'created',
    header: ({ column }) => (
      <TableColumnHeader column={column} title="创建时间" />
    ),
    cell: ({ row }) => <div className="w-[80px]">{row.getValue("created")}</div>,
    enableSorting: true,
    enableHiding: true,
  },
  {
    id: 'actions',
    cell: ({ row }) => {
      return (
        <div>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="default">选项</Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="border-2 w-20 rounded-lg">
              <DropdownMenuItem onSelect={() => console.log(row)}>
                <div className="text-center w-full">编辑</div>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      );
    },
  }
]
