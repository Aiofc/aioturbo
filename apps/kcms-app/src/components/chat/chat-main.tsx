import React from "react";
import ChatInput from "./chat-input";
import AvatarChat from "./avatar-chat";
import { ScrollArea, ScrollBar } from "../ui/scroll-area";
import { ChatMessageList } from "../../types";

interface ChatMainProps {
  chatList: ChatMessageList;
}

export default function ChatMain({ chatList }: ChatMainProps) {
  // const message = "阿看我大豪科技啊我核打击好啦伟大捡垃圾伟大科技阿瓦；点击；";
  return (
    <div className='rounded-md container h-[94vh] flex flex-col justify-between border-2'>
      <div className='flex flex-col h-full overflow-auto'>
        <ScrollArea>
        {chatList.map((chat, index) => {
          return (
            <div
              className={`flex-shrink-0 p-4 w-auto ${chat.role === "bot" ? "mr-auto" : "ml-auto"}`}
              key={index}
            >
              <AvatarChat
                message={chat.message}
                role={chat.role}
                avatar={chat.avatar}
              />
            </div>
          );
        })}
        <ScrollBar />
        </ScrollArea>
      </div>
      <ChatInput />
    </div>
  );
}
