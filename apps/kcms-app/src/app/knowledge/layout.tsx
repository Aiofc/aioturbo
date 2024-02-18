import React, { ReactNode } from 'react'

interface Props {
  children: ReactNode;
}

export default function KnowledgeLayout({ children }: Props) {
  return (
    <div className="container relative">
      <section>{children}</section>
    </div>
  )
}
