'use client';
import React from 'react'
import { useParams } from 'next/navigation'

export default function KnowledgeForm() {
  const params = useParams<{ id: string}>()
  
  return (
    <div>{params.id ? `${params.id}编辑模式` : "创建模式"}</div>
  )
}
