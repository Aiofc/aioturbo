"use client";

/**
 * 仅做页面拼接以及样式调整展示，后期删除
 */

import React from 'react'
import ChatHistory from '../../components/chat/chat-history'
import { Button } from "../../components/ui/button";
import { signIn, signUp } from '../../actions/auth-action';
import { hitstoryList } from '../../demo-data/history-demo';

export default function TestPage() {

  function LoginButton() {
    return (<Button onClick={async ()=>{
      const data = await signIn({ email: 'test@gmail.com', password: '123456789' })
      console.log(data)
    }}>登录测试</Button>)
  }

  function RegistButton() {
    return (<Button onClick={async ()=>{
      const data = await signUp({ email: 'test@gmail.com', password: '123456789', username: 'test'})
      console.log(data)
    }}>注册测试</Button>)
  }
  return (
      <>
        <LoginButton/>
        <RegistButton/>
        <ChatHistory historyList={hitstoryList} />
      </>

  )
}
