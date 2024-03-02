import React from "react";
import {ChatHistoryList} from "../../types";
import {Button} from "../ui/button";
import {
    MoreHorizontal,
    Archive,
    ExternalLink,
    PencilLine,
    Trash2,
} from "lucide-react";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import IconButton from "../common/icon-button";

interface ChatHistoryProps {
    historyList: ChatHistoryList;
}

export default function ChatHistory({historyList}: ChatHistoryProps) {
    return (
        <div className='flex flex-col'>
            {historyList.map((history, index) => {
                return (
                    <DropdownMenu key={index}>
                        <div className='flex flex-row justify-between w-full py-2 hover:bg-slate-400 rounded-md'>
                            <div className='text-lg font-bold flex items-center'>
                                {history.title}
                            </div>
                            <div className='flex items-center'>
                                <DropdownMenuTrigger asChild>
                                    <Button className='mr-1 w-12' variant='ghost'>
                                        <MoreHorizontal/>
                                    </Button>
                                </DropdownMenuTrigger>
                                <DropdownMenuContent className='w-56'>
                                    <DropdownMenuItem>
                                        <IconButton icon={<ExternalLink/>}>分享</IconButton>
                                    </DropdownMenuItem>
                                    <DropdownMenuItem>
                                        <IconButton icon={<PencilLine/>}>重命名</IconButton>
                                    </DropdownMenuItem>
                                    <DropdownMenuItem>
                                        <IconButton icon={<Trash2/>} variant="destructive">删除</IconButton>
                                    </DropdownMenuItem>
                                </DropdownMenuContent>
                                <Button className='mr-1 w-12' variant='ghost'>
                                    <Archive/>
                                </Button>
                            </div>
                        </div>
                    </DropdownMenu>
                );
            })}
        </div>
    );
}
