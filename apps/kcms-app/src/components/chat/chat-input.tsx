"use client";
import React from "react";
import { Textarea } from "../ui/textarea";
import { ArrowUp } from "lucide-react";
import { Button } from "../ui/button";

export default function ChatInput() {
  return (
    <div className='fixed-0 relative bottom-0 w-full'>
      <Textarea placeholder='Type your message here.' className='resize-y' />
      <Button className='absolute right-4 bottom-4 w-12'>
        <ArrowUp />
      </Button>
    </div>
  );
}
