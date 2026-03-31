import type { ReactNode } from "react"

interface BoxProps {
  children: ReactNode;
  className?: string;
}


export function Box({ children, className = "" }: BoxProps) 
{
  return (
    <div className={`box ${className}`.trim()}>
      {children}
    </div>
  )
}
