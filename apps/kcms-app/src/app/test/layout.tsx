import React, { ReactNode } from 'react'

interface Props {
  children: ReactNode;
}

export default function KnowledgeLayout({ children }: Props) {
  return (
      <div className="mr-10 ml-10">{children}</div>
  )
}
