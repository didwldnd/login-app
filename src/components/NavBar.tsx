// components/NavBar.tsx
import { Link } from "react-router-dom"
import NavLink from "./NavLink"
// import "./NavBar.css" // 필요 시 NavBar 전용 스타일 분리

function NavBar() {
  return (
    <nav className="navbar">
      <div className="navbar-container">
        <Link to="/" className="navbar-logo">Title</Link>
        <div className="navbar-links">
          <NavLink to="/">홈</NavLink>
          <NavLink to="/about">소개</NavLink>
          <NavLink to="/find-password">비밀번호 찾기</NavLink>
        </div>
      </div>
    </nav>
  )
}

export default NavBar
