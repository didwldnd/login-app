// components/NavLink.tsx
import React from "react"
import { Link, useLocation } from "react-router-dom"

interface NavLinkProps {
  to: string
  children: React.ReactNode
}

function NavLink({ to, children }: NavLinkProps) {
  const location = useLocation()
  const isActive = location.pathname === to

  return (
    <Link to={to} className={`nav-link ${isActive ? "active" : ""}`}>
      {children}
    </Link>
  )
}

export default NavLink
