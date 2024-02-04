"use client";
import React, { useState } from "react";
import { TooltipProvider } from "../ui/tooltip";
import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from "../ui/resizable";
import { cn } from "../../lib/utils";
import { Button } from "../ui/button";
import { SquarePen, Bot } from "lucide-react";
import { Separator } from "@radix-ui/react-dropdown-menu";
import { ScrollArea, ScrollBar } from "../ui/scroll-area";
import ChatMain from "./chat-main";
import { ChatHistoryList, ChatMessageList } from "../../types";
import ChatHistory from "./chat-history";

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

  const chatList: ChatMessageList = [
    {
      message: "你好，有什么可以帮助您",
      role: "bot",
    },
    {
      message: "我想要一份报告",
      role: "user",
    },
    {
      message: "好的，马上为您生成报告",
      role: "bot",
    },
    {
      message: "谢谢",
      role: "user",
    },
    {
      message: "不客气",
      role: "bot",
    },
    {
      message: "再见",
      role: "user",
    },
    {
      message: "再见",
      role: "bot",
    },
    {
      message: "再见",
      role: "user",
    },
    {
      message: "再见",
      role: "bot",
    },
    {
      message: "再见",
      role: "user",
    },
    {
      message: "再见",
      role: "bot",
    },
    {
      message: "再见",
      role: "user",
    },
    {
      message: "再见",
      role: "bot",
    },
    {
      message: "再见",
      role: "user",
    },
    {
      message: "再见",
      role: "bot",
    },
    {
      message: "再见",
      role: "user",
    },
    {
      message: "再见",
      role: "bot",
    },
    {
      message: "再见",
      role: "user",
    },
    {
      message: "再见",
      role: "bot",
    },
    {
      message: "再见",
      role: "user",
    },
    {
      message: "再见",
      role: "bot",
    },
    {
      message: "再见",
      role: "user",
    },
    {
      message: "再见",
      role: "bot",
    },
    {
      message: "再见",
      role: "user",
    },
    {
      message: "再见",
      role: "bot",
    },
  ];

  const hitstoryList: ChatHistoryList = [
    {
      id: "1",
      title: "title1",
      description: "description",
    },
    {
      id: "2",
      title: "title2",
      description: "description2",
    },
    {
      id: "3",
      title: "title3",
      description: "description3",
    },
    {
      id: "4",
      title: "title4",
      description: "description4",
    },
  ];

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
                    <Bot className='mr-3' /> 开始新的聊天
                  </div>
                  <SquarePen />
                </div>
              </Button>
            </div>
            <ScrollArea className='flex-1'>
              <ChatHistory historyList={hitstoryList} />
              <ScrollBar orientation='vertical' />
            </ScrollArea>
          </div>
        </ResizablePanel>
        <ResizableHandle withHandle />
        <ResizablePanel defaultSize={defaultLayout[1]} minSize={30}>
          <ChatMain chatList={chatList} />
        </ResizablePanel>
      </ResizablePanelGroup>
    </TooltipProvider>
  );
}
