// components/LoggedInView.tsx
import "./LoggedInView.css"

interface Props {
  userName: string
  onLogout: () => void
}

function LoggedInView({ userName, onLogout }: Props) {
  return (
    <div className="logged-in-container">
      <p className="welcome-message">
        <span className="user-name">{userName}</span>님 반갑습니다!
      </p>
      <button className="logout-button" onClick={onLogout}>
        로그아웃
      </button>
    </div>
  )
}

export default LoggedInView
