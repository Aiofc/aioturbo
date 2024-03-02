"use client";
import React, {useState} from "react";
import {TooltipProvider} from "../ui/tooltip";
import {
    ResizableHandle,
    ResizablePanel,
    ResizablePanelGroup,
} from "../ui/resizable";
import {cn} from "../../lib/utils";
import {Button} from "../ui/button";
import {SquarePen, Bot} from "lucide-react";
import {ScrollArea, ScrollBar} from "../ui/scroll-area";
import ChatMain from "./chat-main";
import ChatHistory from "./chat-history";
import {hitstoryList} from "../../demo-data/history-demo.ts";
import {chatList} from "../../demo-data/chat-demo.ts";

interface ChatProps {
    defaultLayout: number[] | undefined;
    defaultCollapsed?: boolean;
    navCollapsedSize: number;
}

export default function ChatComponent({
                                          defaultLayout = [265, 1000],
                                          defaultCollapsed = false,
                                          navCollapsedSize,
                                      }: ChatProps) {
    const [isCollapsed, setIsCollapsed] = useState(defaultCollapsed);

    return (
        <TooltipProvider delayDuration={0}>
            <ResizablePanelGroup
                direction='horizontal'
                onLayout={(sizes: number[]) => {
                    document.cookie = `react-resizable-panels:layout=${JSON.stringify(
                        sizes
                    )}`;
                }}
                className='h-full items-stretch'
            >
                <ResizablePanel
                    defaultSize={defaultLayout[0]}
                    collapsedSize={navCollapsedSize}
                    collapsible={true}
                    minSize={15}
                    maxSize={20}
                    onCollapse={() => {
                        setIsCollapsed(!isCollapsed);
                        document.cookie = `react-resizable-panels:collapsed=${JSON.stringify(
                            !isCollapsed
                        )}`;
                    }}
                    className={cn(
                        isCollapsed &&
                        "min-w-[50px] transition-all duration-300 ease-in-out"
                    )}
                >
                    <div>
                        <div
                            className={cn(
                                "flex h-[52px] items-center justify-center rounded-md bg-slate-400",
                                isCollapsed ? "h-[52px]" : "px-2"
                            )}
                        >
                            <Button className='w-full' variant='ghost'>
                                <div className='flex justify-between w-full'>
                                    <div className=' flex '>
                                        <Bot className='mr-3'/> 开始新的聊天
                                    </div>
                                    <SquarePen/>
                                </div>
                            </Button>
                        </div>
                        <ScrollArea className='flex-1'>
                            <ChatHistory historyList={hitstoryList}/>
                            <ScrollBar orientation='vertical'/>
                        </ScrollArea>
                    </div>
                </ResizablePanel>
                <ResizableHandle withHandle/>
                <ResizablePanel defaultSize={defaultLayout[1]} minSize={30}>
                    <ChatMain chatList={chatList}/>
                </ResizablePanel>
            </ResizablePanelGroup>
        </TooltipProvider>
    );
}
