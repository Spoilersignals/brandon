import { Link } from 'react-router-dom'
import Header from '../components/common/Header'
import './Home.css'

const Home = () => {
  return (
    <>
      <Header />
      <div className="home-container">
        <section className="hero">
          <div className="container">
            <h1 className="hero-title">Welcome to Brandon IT Project</h1>
            <p className="hero-subtitle">
              A comprehensive IT management system for efficient data handling and user management
            </p>
            <div className="hero-actions">
              <Link to="/register" className="btn btn-primary btn-large">
                Get Started
              </Link>
              <Link to="/login" className="btn btn-secondary btn-large">
                Login
              </Link>
            </div>
          </div>
        </section>

        <section className="features">
          <div className="container">
            <h2>Key Features</h2>
            <div className="features-grid">
              <div className="feature-card">
                <h3>🔐 Secure Authentication</h3>
                <p>JWT-based authentication system with role-based access control</p>
              </div>
              <div className="feature-card">
                <h3>📊 Data Management</h3>
                <p>Efficiently manage and organize your data with advanced filtering</p>
              </div>
              <div className="feature-card">
                <h3>👥 User Management</h3>
                <p>Complete user management system with profile customization</p>
              </div>
              <div className="feature-card">
                <h3>📱 Responsive Design</h3>
                <p>Works seamlessly across all devices and screen sizes</p>
              </div>
              <div className="feature-card">
                <h3>🚀 Fast Performance</h3>
                <p>Optimized for speed and efficiency with modern technology</p>
              </div>
              <div className="feature-card">
                <h3>🔍 Advanced Search</h3>
                <p>Powerful search and filtering capabilities for quick data access</p>
              </div>
            </div>
          </div>
        </section>

        <section className="cta">
          <div className="container">
            <h2>Ready to Get Started?</h2>
            <p>Join us today and experience the power of efficient IT management</p>
            <Link to="/register" className="btn btn-primary btn-large">
              Create Your Account
            </Link>
          </div>
        </section>
      </div>
    </>
  )
}

export default Home
