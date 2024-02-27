'use client';
import React, {ReactNode} from 'react';
import {DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger} from "../../ui/dropdown-menu.tsx";
import {MoreHorizontal} from "lucide-react";
import {useRouter} from "next/navigation";
import {ScrollArea, ScrollBar} from "../../ui/scroll-area.tsx";
import {
    Dialog,
    DialogClose,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle, DialogTrigger
} from "../../ui/dialog.tsx";
import {Label} from "../../ui/label.tsx";
import {Input} from "../../ui/input.tsx";
import {Button} from "../../ui/button.tsx";
import OperateBar from "../page/OperateBar.tsx";

/**
 * 注意：还需要做一个分页功能
 * */

interface KanbanViewProps {
    dataList: any[],
    editLink?: string, // 启用编辑选项
    title?: string,  // 指定显示标题
    description?: string, // 指定显示内容
    onClick: (data: any) => void // 点击事件
    DropDownItems?: (data: any) => ReactNode // 添加额外下拉菜单
    operateBar?:{
        create?: string;  // 启用创建选项
        options?: () => ReactNode;
        placeholder?: string;
    }
}

function KanbanView({
    dataList,
    editLink,
    operateBar,
    title,
    description,
    onClick,
    DropDownItems
}: KanbanViewProps) {
    const router = useRouter();
    const confirm_column = "name";
    const [name, setName] = React.useState("");
    const [status, setStatus] = React.useState(false);
    return (
        <ScrollArea>
            <OperateBar create={operateBar?.create} placeholder={operateBar?.placeholder}/>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                {dataList.map((data, index) => {
                    return (
                        <Dialog key={index}>
                            <DropdownMenu>
                                <div className="overflow-hidden shadow-sm rounded-lg border-2 group"
                                     onClick={()=> onClick? onClick(data): null}
                                >
                                    <div className="p-4">
                                        <div className="flex flex-row justify-between items-center mb-2">
                                            <h3 className="text-lg font-semibold">{title? data[title]: data.name}</h3>
                                            <DropdownMenuTrigger asChild>
                                                <MoreHorizontal
                                                    className="mr-3 ml-3 lg:opacity-0 group-hover:opacity-100 w-15 rounded-md"
                                                    height={30}
                                                    width={40}
                                                />
                                            </DropdownMenuTrigger>
                                        </div>
                                        <p className="text-sm text-muted-foreground overflow-ellipsis overflow-hidden h-20 line-clamp-4">
                                            {description? data[description]: data.description}
                                        </p>
                                    </div>
                                </div>
                                <DropdownMenuContent className="border-2 w-20 rounded-lg">
                                    {DropDownItems? DropDownItems(data): null}
                                    {editLink ? (
                                        <DropdownMenuItem
                                            onClick={() =>
                                                router.push(`${editLink}/${data.id}`)
                                            }
                                        >
                                            <div className="text-center w-full">编辑</div>
                                        </DropdownMenuItem>
                                        ): null}
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
                                            {data[confirm_column]}
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
                                            placeholder="请输入红字名称"
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
                                            if (name !== data[confirm_column]) {
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
                    );
                })}
            </div>
            <ScrollBar />
        </ScrollArea>
    );
}

export default KanbanView;
