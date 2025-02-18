import { useState } from 'react'
import './App.css'

function App() {
  const [theme, setTheme] = useState('light')
  const [notifications] = useState([
    { id: 1, text: "John liked your post", time: "2 minutes ago" },
    { id: 2, text: "New game invitation from Sarah", time: "1 hour ago" },
    { id: 3, text: "Basketball game starting soon", time: "3 hours ago" }
  ])
  const [showNotifications, setShowNotifications] = useState(false)
  const [showComments, setShowComments] = useState({})
  const [posts, setPosts] = useState([
    {
      id: 1,
      author: 'BasketballFan23',
      avatar: 'https://i.pravatar.cc/150?img=1',
      title: 'Pick-up game at Central Park!',
      location: '📍 Central Park Basketball Courts',
      content: 'Looking for more players for a 3v3 game. We\'re here until 6pm. All skill levels welcome!',
      likes: 45,
      liked: false,
      comments: [
        { id: 1, author: 'HoopMaster', content: 'I\'ll be there in 15!', time: '2 hours ago' },
        { id: 2, author: 'Baller4Life', content: 'How many people are there now?', time: '1 hour ago' }
      ]
    },
    {
      id: 2,
      author: 'SoccerPro',
      avatar: 'https://i.pravatar.cc/150?img=2',
      title: 'Soccer practice session',
      location: '📍 Riverside Fields',
      content: 'Organizing a practice session this evening. Focus on passing drills and small-sided games.',
      likes: 32,
      liked: false,
      comments: [
        { id: 3, author: 'FootballFanatic', content: 'What time are you starting?', time: '30 minutes ago' }
      ]
    }
  ])

  const toggleTheme = () => {
    const newTheme = theme === 'light' ? 'dark' : 'light'
    setTheme(newTheme)
    document.documentElement.setAttribute('data-theme', newTheme)
  }

  const toggleLike = (postId) => {
    setPosts(posts.map(post => {
      if (post.id === postId) {
        return {
          ...post,
          likes: post.liked ? post.likes - 1 : post.likes + 1,
          liked: !post.liked
        }
      }
      return post
    }))
  }

  const toggleComments = (postId) => {
    setShowComments(prev => ({
      ...prev,
      [postId]: !prev[postId]
    }))
  }

  return (
    <div className="app">
      <nav className="navbar">
        <a href="/" className="logo">SportsSocial</a>
        <div className="nav-center">
          <input 
            type="search" 
            placeholder="Search posts..." 
            className="search-bar"
          />
          <button className="nav-button">
            🏠 Home
          </button>
          <div style={{ position: 'relative' }}>
            <button 
              className="nav-button"
              onClick={() => setShowNotifications(!showNotifications)}
            >
              🔔 Notifications
              {notifications.length > 0 && (
                <span className="notification-badge">{notifications.length}</span>
              )}
            </button>
            {showNotifications && (
              <div className="notifications-dropdown">
                {notifications.map(notification => (
                  <div key={notification.id} className="notification-item">
                    <div>{notification.text}</div>
                    <small>{notification.time}</small>
                  </div>
                ))}
              </div>
            )}
          </div>
          <button onClick={toggleTheme} className="theme-toggle">
            {theme === 'light' ? '🌞' : '🌜'}
          </button>
        </div>
      </nav>

      <aside className="sidebar">
        <div className="filter-section">
          <h3>Filters</h3>
          <div className="filter-group">
            <div className="filter-title">Sports</div>
            <div className="filter-options">
              <label className="filter-option">
                <input type="checkbox" /> Basketball
              </label>
              <label className="filter-option">
                <input type="checkbox" /> Soccer
              </label>
              <label className="filter-option">
                <input type="checkbox" /> Tennis
              </label>
              <label className="filter-option">
                <input type="checkbox" /> Volleyball
              </label>
            </div>
          </div>
          <div className="filter-group">
            <div className="filter-title">Event Type</div>
            <div className="filter-options">
              <label className="filter-option">
                <input type="checkbox" /> Games
              </label>
              <label className="filter-option">
                <input type="checkbox" /> Practice
              </label>
              <label className="filter-option">
                <input type="checkbox" /> Training
              </label>
              <label className="filter-option">
                <input type="checkbox" /> Tournament
              </label>
            </div>
          </div>
        </div>
      </aside>

      <main className="main-content">
        <div className="posts-container">
          {posts.map(post => (
            <div key={post.id} className="post">
              <div className="post-content-section">
                <div className="post-header">
                  <img src={post.avatar} alt={post.author} className="post-avatar" />
                  <span className="post-info">Posted by {post.author}</span>
                </div>
                <h2 className="post-title">{post.title}</h2>
                <div className="post-location">{post.location}</div>
                <p className="post-text">{post.content}</p>
              </div>
              
              <div className="post-footer">
                <button 
                  className={`like-button ${post.liked ? 'active' : ''}`}
                  onClick={() => toggleLike(post.id)}
                >
                  {post.liked ? '❤️' : '🤍'} {post.likes}
                </button>
                <button 
                  className="comments-button"
                  onClick={() => toggleComments(post.id)}
                >
                  💬 {post.comments.length} Comments
                </button>
              </div>

              {showComments[post.id] && (
                <div className="comments-section">
                  {post.comments.map(comment => (
                    <div key={comment.id} className="comment">
                      <div className="comment-header">
                        <strong>{comment.author}</strong> • {comment.time}
                      </div>
                      {comment.content}
                    </div>
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>
      </main>
    </div>
  )
}

export default App