import React, { useState } from "react";
import { ColumnDef } from "@tanstack/react-table";
import { EmployeeTableColumns } from "../../../types";
import { Button } from "../../ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "../../ui/dropdown-menu";
import { Checkbox } from "../../ui/checkbox";
import { TableColumnHeader } from "../../common/TableColumnHeader";
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
import { toBoolean } from "../../../lib/other.ts";
import request from "../../../utils/request.ts";
import { toast } from "../../ui/use-toast.ts";

const confirm_column = "name";

export const columns: ColumnDef<EmployeeTableColumns>[] = [
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
    accessorKey: "id",
    header: ({ column }) => (
      <TableColumnHeader column={column} title="ID" className="hidden" />
    ),
    cell: ({ row }) => (
      <div className="w-[80px] hidden">{row.getValue("id")}</div>
    ),
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: "name",
    header: ({ column }) => <TableColumnHeader column={column} title="员工" />,
    cell: ({ row }) => <div className="w-[80px]">{row.getValue("name")}</div>,
    enableSorting: true,
    enableHiding: true,
  },
  {
    accessorKey: "jobTitle",
    header: ({ column }) => <TableColumnHeader column={column} title="岗位" />,
    cell: ({ row }) => (
      <div className="w-[80px]">{row.getValue("jobTitle")}</div>
    ),
    enableSorting: true,
    enableHiding: true,
  },
  {
    accessorKey: "active",
    header: ({ column }) => <TableColumnHeader column={column} title="状态" />,
    cell: ({ row }) => (
      <div className="w-[80px]">
        {toBoolean(row.getValue("active")) ? "在职" : "离职"}
      </div>
    ),
    enableSorting: true,
    enableHiding: true,
  },
  {
    id: "actions",
    cell: ({ row }) => {
      const router = useRouter();
      const [name, setName] = useState<string | null>(null);
      const [status, setStatus] = useState<boolean>(false);
      async function deleteRequest(ids: string[]) {
        const response = await request("/gateway/employee/empolyee/", {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(ids),
        });
        if(response.data && response.ok){
          toast({
            title: "删除成功",
            description: "删除成功",
            variant: "default",
            duration: 2000
          });
          window.location.reload();
          console.log("刷新页面")
        }else{
          toast({
            title: "删除失败",
            description: "删除失败,请联系管理员",
            variant: "destructive",
            duration: 2000
          });
        }
      }

      return (
        <div>
          <Dialog>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="default">选项</Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="border-2 w-20 rounded-lg">
                <DropdownMenuItem
                  onClick={() => router.push(`/employee/${row.getValue("id")}`)}
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
                  注意相关联的数据，请谨慎操作
                </DialogDescription>
              </DialogHeader>
              <div className="grid gap-4 py-4">
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label className="text-right">确认名称</Label>
                  <Input
                    id={confirm_column}
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
                      deleteRequest([row.getValue("id")])
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
];
