import React, { FC, PropsWithChildren } from 'react'

type Props = {
  content?: string
}

export const Badge: FC<PropsWithChildren<Props>> = ({ children, content }) => {
  return (
    <div className="relative">
      {children}
      {content && (
        <span
          className="absolute -top-2 -right-2 rounded-full 
      bg-red-500 px-1.5 text-sm font-semibold text-white"
        >
          {content}
        </span>
      )}
    </div>
  )
}
