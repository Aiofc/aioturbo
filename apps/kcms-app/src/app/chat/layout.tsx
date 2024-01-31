import React, { ReactNode } from 'react'

interface Props {
  children: ReactNode;
}

export default function ChatLayout({ children }: Props) {
  return (
    <div className="container relative">
      <section>{children}</section>
    </div>
  )
}
