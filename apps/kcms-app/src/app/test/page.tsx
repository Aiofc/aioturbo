"use client";
import React from 'react'
import ChatHistory from '../../components/chat/chat-history'
import { ChatHistoryList } from '../../types'
import { Button } from "../../components/ui/button";
import { signIn } from '../../actions/auth-action';
import { hitstoryList } from '../../demo-data/history-demo';
export default function TestPage() {

  function Test() {

    return (<Button onClick={async ()=>{
      const data = await signIn({ email: 'test@gmail.com', password: '123456789' })
      console.log(data)
    }}>test</Button>)
  }

  return (
      <>
        <Test></Test>
        <ChatHistory historyList={hitstoryList} />
      </>

  )
}
