import { useEffect, useState, useCallback, useRef } from 'react'
import ContactPage from './pages/Contact'
import SubscribePage from './pages/Subscribe'
import SignInPage from './pages/SignIn'
import './App.css'

function App() {
  const [currentPage, setCurrentPage] = useState('home')
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })
  const [heroInView, setHeroInView] = useState(false)
  const videoRefs = useRef([])

  // Simple video data with placeholder thumbnails
  const videoData = [
    {
      id: 1,
      videoUrl: "/src/assets/Images/Balancing work, editing, posting, and community building is hard… let us make it easy ;) The @ur.mp4",
      thumbnail: "/src/assets/Images/2.png"
    },
    {
      id: 2,
      videoUrl: "/src/assets/Images/Balancing work, editing, posting, and community building is hard… let us make it easy ;) The @ur.mp4",
      thumbnail: "/src/assets/Images/2.png"
    },
    {
      id: 3,
      videoUrl: "/src/assets/Images/Balancing work, editing, posting, and community building is hard… let us make it easy ;) The @ur.mp4",
      thumbnail: "/src/assets/Images/2.png"
    },
    {
      id: 4,
      videoUrl: "/src/assets/Images/Balancing work, editing, posting, and community building is hard… let us make it easy ;) The @ur.mp4",
      thumbnail: "/src/assets/Images/2.png"
    }
  ]

  // Handle video hover events
  const handleVideoHover = (index, isHovering) => {
    const video = videoRefs.current[index]
    if (video) {
      if (isHovering) {
        video.play().catch(e => console.log('Video play failed:', e))
      } else {
        video.pause()
        video.currentTime = 0
      }
    }
  }

  // Enhanced mouse tracking for parallax effects
  const handleMouseMove = useCallback((e) => {
    setMousePosition({
      x: (e.clientX / window.innerWidth) * 100,
      y: (e.clientY / window.innerHeight) * 100
    })
  }, [])

  useEffect(() => {
    // Reset all animations when page mounts
    const resetAnimations = () => {
      const animatedElements = document.querySelectorAll('[data-animate]')
      animatedElements.forEach(el => {
        el.classList.remove('in-view')
      })
      const childElements = document.querySelectorAll('[data-animate-child]')
      childElements.forEach(el => {
        el.classList.remove('animate-child-in')
      })
    }

    resetAnimations()

    // Enhanced intersection observer with more dynamic animations
    const observer = new IntersectionObserver(
      entries => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            // Add staggered delays for child elements
            const children = entry.target.querySelectorAll('[data-animate-child]')
            children.forEach((child, index) => {
              setTimeout(() => {
                child.classList.add('animate-child-in')
              }, index * 100)
            })
            
            entry.target.classList.add('in-view')
            
            // Special handling for hero section
            if (entry.target.classList.contains('hero')) {
              setHeroInView(true)
            }
          }
        })
      },
      {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px',
      },
    )

    // Small delay to ensure DOM is ready
    setTimeout(() => {
      const animated = document.querySelectorAll('[data-animate]')
      animated.forEach(el => observer.observe(el))
    }, 100)

    // Mouse move listener for parallax effects
    window.addEventListener('mousemove', handleMouseMove)

    return () => {
      observer.disconnect()
      window.removeEventListener('mousemove', handleMouseMove)
    }
  }, [handleMouseMove, currentPage])

  useEffect(() => {
    const handleScroll = () => {
      // Add scroll-based parallax to hero elements only
      const heroVisual = document.querySelector('.hero-visual')
      const heroDiamond = document.querySelector('.hero-diamond-gray')
      const heroFloating = document.querySelectorAll('.hero-floating')
      
      if (heroVisual && window.scrollY < window.innerHeight) {
        const scrollPercent = window.scrollY / window.innerHeight
        
        if (heroDiamond) {
          heroDiamond.style.transform = `rotate(45deg) translateY(${scrollPercent * 30}px)`
        }
        
        heroFloating.forEach((floating, index) => {
          floating.style.transform = `translateY(${scrollPercent * (10 + index * 5)}px)`
        })
      }
    }

    handleScroll()
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  // Dynamic hero diamond style based on mouse position
  const heroDiamondStyle = {
    transform: `rotate(45deg) translateY(${(mousePosition.y - 50) * 0.1}px) translateX(${(mousePosition.x - 50) * 0.05}px)`,
    filter: `brightness(${100 + mousePosition.x * 0.2}%)`
  }

  // Function to scroll to specific section
  const scrollToSection = (sectionId) => {
    const element = document.getElementById(sectionId)
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' })
    } else {
      window.scrollTo({ top: 0, behavior: 'smooth' })
    }
    setCurrentPage('home')
  }

  return (
    <>
      <div className="page">
        <header className="navbar">
          <div className="nav-left">
            <div className="logo-container">
              <img src="/src/assets/Images/white_logoo.png" alt="Urban Desiii Logo" className="logo-image" />
              <span className="logo-text">Urban Desiii</span>
            </div>
          </div>
          <div className="nav-right">
            <button className="nav-link" onClick={() => scrollToSection('')}>Home</button>
            <button className="nav-link" onClick={() => scrollToSection('about-section')}>About</button>
            <button className="nav-link" onClick={() => scrollToSection('')}>Service</button>
            <button className="nav-link" onClick={() => setCurrentPage('contact')}>Contact</button>
            <button className="nav-link" onClick={() => setCurrentPage('subscribe')}>Subscribe</button>
            <button className="btn btn-primary" onClick={() => setCurrentPage('signin')}>Sign In</button>
          </div>
        </header>

        {currentPage === 'contact' ? <ContactPage /> : 
         currentPage === 'subscribe' ? <SubscribePage /> : 
         currentPage === 'signin' ? <SignInPage /> : 
         (
          <main>
            {/* Enhanced Hero */}
            <section className="hero" data-animate="fade-up">
              <div className="hero-content">
                <p className="hero-kicker" data-animate-child>All in one Creator Store</p>
                <h1 data-animate-child>
                  <span className="hero-text-reveal">All in one</span>
                  <br />
                  <span className="hero-text-reveal" style={{ animationDelay: '0.2s' }}>Creator Store</span>
                </h1>
                <p className="hero-sub" data-animate-child>
                  Turn followers into customers &amp; brands into partners with just one
                  platform.
                </p>
                <div className="hero-actions" data-animate-child>
                  <button className="btn btn-primary hero-cta animate-bounce-in">
                    Get Started for free
                    <span className="btn-shine"></span>
                  </button>
                </div>
                <div className="hero-logos-block" data-animate-child>
                  <p className="hero-trust-label">
                    OVER 100,000 CREATORS &amp; COACHES RUN THEIR BUSINESSES ON Urban Desiii
                  </p>
                  <div className="hero-logos">
                    <span className="logo-item">Business Insider</span>
                    <span className="logo-item">TechCrunch</span>
                    <span className="logo-item">Forbes</span>
                  </div>
                </div>
              </div>

              <div className="hero-visual" data-animate="fade-left">
                {/* Gray diamond shape */}
                <div className="hero-diamond-gray" data-animate-child />

                <div className="hero-floating hero-floating--top animate-float" data-animate-child style={{ animationDelay: '0.8s' }}>
                  <div className="floating-icon">📅</div>
                  <div className="floating-text">
                    <div className="floating-title">Tik-tok</div>
                  </div>
                </div>

                <div className="hero-floating hero-floating--right animate-float" data-animate-child style={{ animationDelay: '1s' }}>
                  <div className="floating-icon">⬇️</div>
                  <div className="floating-text">
                    <div className="floating-title">Instagram</div>
                  </div>
                </div>

                <div className="hero-floating hero-floating--bottom animate-float" data-animate-child style={{ animationDelay: '1.2s' }}>
                  <div className="floating-icon">✉️</div>
                  <div className="floating-text">
                    <div className="floating-title">Facebook</div>
                  </div>
                </div>

                <div className="hero-card animate-card-hover hero-card-delayed" data-animate-child style={{ animationDelay: '1.5s' }}>
                  <div className="hero-card-image">
                    <img 
                      src="/src/assets/Images/@urbandesiii.png" 
                      alt="Urban Desiii Profile" 
                      className="hero-card-profile-image"
                    />
                  </div>
                  <div className="creator-header">
                    <div className="avatar animate-pulse-slow" />
                    <div>
                      <div className="creator-name">Urban Desiii</div>
                      <div className="creator-handle">@urbandesiii</div>
                    </div>
                  </div>
                  <div className="creator-tags">
                    <span className="tag-item">Tik-tok</span>
                    <span className="tag-item">Instagram</span>
                    <span className="tag-item">Facebook</span>
                  </div>
                  <div className="creator-stat-row">
                    <span>Join 100,000+ creators</span>
                    <span className="creator-pill animate-typing">urbandesiii.com/creators/mediakit</span>
                  </div>
                </div>
              </div>
            </section>

            {/* Simple Video Gallery Section */}
            <section className="video-gallery" data-animate="fade-up">
              <div className="video-gallery-header" data-animate-child>
                <h2>Trending Creator Content</h2>
              </div>
              
              <div className="video-grid" data-animate-child>
                {videoData.map((video, index) => (
                  <div 
                    key={video.id} 
                    className="video-card"
                    data-animate="fade-up"
                    data-animate-child
                    style={{ animationDelay: `${index * 0.1}s` }}
                    onMouseEnter={() => handleVideoHover(index, true)}
                    onMouseLeave={() => handleVideoHover(index, false)}
                  >
                    <div className="video-container">
                      <img 
                        src={video.thumbnail} 
                        alt={`Video ${video.id}`}
                        className="video-thumbnail-img"
                      />
                      <video
                        ref={el => videoRefs.current[index] = el}
                        src={video.videoUrl}
                        className="video-element"
                        muted
                        loop
                        playsInline
                      />
                    </div>
                  </div>
                ))}
              </div>
            </section>

            {/* About Section */}
            <section className="about" id="about-section" data-animate="fade-up">
              <div className="about-content">
                <div className="about-intro" data-animate-child>
                  <h2>About Urban Desiii</h2>
                  <p className="about-description">
                    Urban Desiii is a social media and marketing agency that specializes in organic growth, and personal branding.
                  </p>
                  <p>
                    We handle everything from managing influencers, to creating content, branding small businesses, and engaging with your niche audience to reach your goals.
                  </p>
                  <p>
                    We keep you up to date on all of the latest South Asian news in Bollywood, and through creators, delivering the hottest trends from clothing brands, to upcoming music artists.
                  </p>
                </div>

                <div className="about-actions" data-animate-child>
                  <p>
                    To book a free consultation with us and kickstart your growth through social media, please fill out the <strong className="highlight">"contact us" form</strong>.
                  </p>
                  <p>
                    To enroll in our social media and marketing courses, please fill out the <strong className="highlight">"learn" form</strong>.
                  </p>
                </div>
              </div>

              <div className="about-stats" data-animate-child>
                <div className="about-stat-card">
                  <h3>Founded in 2018</h3>
                  <p>Urban Desiii has grown into a team of 10 - based all around the world!</p>
                </div>
                <div className="about-stat-card">
                  <h3>Global Team</h3>
                  <p>Our representatives specialize in any, and all audiences - from clothing brands, music artists, influencers/creators, services, and more!</p>
                </div>
              </div>

              <div className="about-story" data-animate-child>
                <div className="story-highlight">
                  <h3>Our Story</h3>
                  <p>
                    Urban Desiii was the first South Asian influencer management agency, that represents creators from a variety of niches.
                  </p>
                  <p>
                    We were inspired to start our agency from the lack of representation that South Asian brands and creators had within the industry.
                  </p>
                  <p>
                    While we have expanded to different demographics, our roots will always highlight South Asian creators and small businesses.
                  </p>
                </div>
              </div>
            </section>
          </main>
        )}
      </div>
      
      {/* Footer moved outside the .page container */}
      <footer className="footer" data-animate="fade-up">
        <div className="footer-content">
          <div className="footer-top">
            <div className="footer-brand" data-animate="fade-up" data-animate-child>
              <div className="logo-container-small">
                <img src="/src/assets/Images/white_logoo.png" alt="Urban Desiii Logo" className="logo-image small" />
                <span className="logo-text">Urban Desiii</span>
              </div>
            </div>
            <div className="footer-columns">
              {[
                { title: "Quick Links", links: ["Home", "About", "Services", "Contact", "Subscribe"] },
                { title: "Resources", links: ["Blog", "FAQ", "Tutorials", "Case Studies", "Documentation"] },
                { title: "Legal", links: ["Privacy Policy", "Terms of Service", "Cookie Policy", "Disclaimer"] },
                { title: "Connect", links: ["Instagram", "TikTok", "Twitter", "LinkedIn", "YouTube"] },
                { title: "Support", links: ["Help Center", "Contact Us", "Report Issue", "Feedback", "Status"] }
              ].map((col, colIndex) => (
                <div key={colIndex} className="footer-col" data-animate="fade-up" data-animate-child>
                  <h4>{col.title}</h4>
                  {col.links.map((link, linkIndex) => (
                    <a key={linkIndex} href="#" className="footer-link">
                      {link}
                    </a>
                  ))}
                </div>
              ))}
            </div>
          </div>
          <div className="footer-bottom">
            <span>© {new Date().getFullYear()} Urban Desiii. All rights reserved.</span>
          </div>
        </div>
      </footer>
    </>
  )
}

export default App