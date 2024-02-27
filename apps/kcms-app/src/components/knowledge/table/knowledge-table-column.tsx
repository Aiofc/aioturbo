import React, { useState } from "react";
import { ColumnDef } from "@tanstack/react-table";
import { KnowledgeManageTableColumns } from "../../../types";
import { Button } from "../../ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "../../ui/dropdown-menu";
import { Checkbox } from "../../ui/checkbox";
import { TableColumnHeader } from "../../common/views/TableColumnHeader.tsx";
import { useRouter } from "next/navigation";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../../ui/dialog";
import { Label } from "../../ui/label";
import { Input } from "../../ui/input";

const confirm_column = "name";
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
        aria-label='Select all'
        className='translate-y-[2px]'
      />
    ),
    cell: ({ row }) => (
      <Checkbox
        checked={row.getIsSelected()}
        onCheckedChange={(value) => row.toggleSelected(!!value)}
        aria-label='Select row'
        className='translate-y-[2px]'
      />
    ),
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: "id",
    header: ({ column }) => (
      <TableColumnHeader column={column} title='ID' className='hidden' />
    ),
    cell: ({ row }) => (
      <div className='w-[80px] hidden'>{row.getValue("id")}</div>
    ),
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: "name",
    header: ({ column }) => (
      <TableColumnHeader column={column} title='知识库名称' />
    ),
    cell: ({ row }) => <div className='w-[80px]'>{row.getValue("name")}</div>,
    enableSorting: true,
    enableHiding: true,
  },
  {
    accessorKey: "active",
    header: ({ column }) => <TableColumnHeader column={column} title='状态' />,
    cell: ({ row }) => <div className='w-[80px]'>{row.getValue("active")? "启用": "禁用"}</div>,
    enableSorting: true,
    enableHiding: true,
  },
  {
    id: "actions",
    cell: ({ row }) => {
      const router = useRouter();
      const [name, setName] = useState<string|null>(null)
      const [status, setStatus] = useState<boolean>(false)
      return (
        <div>
          <Dialog>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="default">操作</Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="border-2 w-20 rounded-lg">
                <DropdownMenuItem
                  onClick={() =>
                    router.push(`/knowledge/${row.getValue("id")}`)
                  }
                >
                  <div className="text-center w-full">编辑</div>
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <DialogTrigger asChild>
                    <div className="text-center w-full text-destructive">
                      删除
                    </div>
                  </DialogTrigger>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
            <DialogContent className="sm:max-w-[425px]">
              <DialogHeader>
                <DialogTitle>确认删除</DialogTitle>
                <DialogDescription>
                  请确认删除{" "}
                  <strong className="text-destructive">
                    {row.getValue(confirm_column)}
                  </strong>{" "}
                  删除后无法恢复，请谨慎操作
                </DialogDescription>
              </DialogHeader>
              <div className="grid gap-4 py-4">
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label className="text-right">确认名称</Label>
                  <Input
                    id="name"
                    className="col-span-3"
                    placeholder="请输入名称"
                    onChange={(e) => {
                      setName(e.target.value);
                      setStatus(false);
                    }}
                  />
                </div>
                {status ? (
                  <div className="text-destructive">请输入正确的名称</div>
                ) : null}
              </div>
              <DialogFooter>
                <Button
                  type="button"
                  variant="destructive"
                  onClick={() => {
                    if (name !== row.getValue(confirm_column)) {
                      setStatus(true);
                    } else {
                      console.log("delete");
                    }
                  }}
                >
                  确认
                </Button>
                <DialogClose asChild>
                  <Button type="button">取消</Button>
                </DialogClose>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </div>
      );
    },
  },
  {
    id: "card_action",
    cell: ({ row }) => {
      const router = useRouter();
      const knowledge_id = row.getValue("id");
      return (
          <div>
            <Button variant="outline" onClick={()=>router.push(`/knowledge/zettle?knowledge_id=${knowledge_id}`)}>知识卡片</Button>
          </div>
      )
    }
  }
];
