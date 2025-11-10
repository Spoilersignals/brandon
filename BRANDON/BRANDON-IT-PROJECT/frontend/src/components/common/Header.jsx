import { Link } from 'react-router-dom'
import { FiLogOut, FiUser } from 'react-icons/fi'
import useAuth from '../../hooks/useAuth'
import './Header.css'

const Header = () => {
  const { user, logout, isAuthenticated } = useAuth()

  return (
    <header className="header">
      <div className="container">
        <div className="header-content">
          <Link to="/" className="logo">
            <h1>Brandon IT Project</h1>
          </Link>

          <nav className="nav">
            {isAuthenticated ? (
              <>
                <Link to="/dashboard" className="nav-link">
                  Dashboard
                </Link>
                <div className="user-menu">
                  <FiUser />
                  <span>{user?.firstName} {user?.lastName}</span>
                </div>
                <button onClick={logout} className="btn btn-logout">
                  <FiLogOut /> Logout
                </button>
              </>
            ) : (
              <>
                <Link to="/login" className="btn btn-primary">
                  Login
                </Link>
                <Link to="/register" className="btn btn-secondary">
                  Register
                </Link>
              </>
            )}
          </nav>
        </div>
      </div>
    </header>
  )
}

export default Header
