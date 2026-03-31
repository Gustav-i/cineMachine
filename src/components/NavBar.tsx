import type { ReactNode } from "react"
import { Logo } from "./Logo"

interface NavBarProps {
  children: ReactNode;
}

export function NavBar({ children }: NavBarProps) 
{
  return (
    <nav className="nav-bar">
      <Logo />
      {children}
    </nav>
  )
}
