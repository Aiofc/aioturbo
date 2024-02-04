import React from 'react'
import ChatHistory from '../../components/chat/chat-history'
import { ChatHistoryList } from '../../types'

export default function TestPage() {

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
    }
  ]

  return (
    <ChatHistory historyList={hitstoryList} />
  )
}
