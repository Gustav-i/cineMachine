
import type { ReactNode } from "react"

interface MainHeaderProps {
  children: ReactNode;
}

export function MainHeader({ children }: MainHeaderProps) 
{
  return <main className="main">{children}</main>
}
