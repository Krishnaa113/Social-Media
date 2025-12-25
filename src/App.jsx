import { useEffect, useState, useCallback, useRef } from 'react'
import ContactPage from './pages/Contact'
import SubscribePage from './pages/Subscribe'
import AboutPage from './pages/About'
import ServicePage from './pages/Service'
import './App.css'

function App() {
  const [currentPage, setCurrentPage] = useState('home')
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })
  const [heroInView, setHeroInView] = useState(false)
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const videoRefs = useRef([])

  // Simple video data with placeholder thumbnails
  const videoData = [
    {
      id: 1,
      videoUrl: "/assets/Images/hero-video.mp4"
    },
    {
      id: 2,
      videoUrl: "/assets/Images/hero-video.mp4"
    },
    {
      id: 3,
      videoUrl: "/assets/Images/hero-video.mp4"
    },
    {
      id: 4,
      videoUrl: "/assets/Images/hero-video.mp4"
    }
  ]

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
          const base = 'translate(-50%, -50%)'
          heroDiamond.style.transform = `${base} rotate(45deg) translateY(${scrollPercent * 30}px)`
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
  const heroBaseTransform = 'translate(-50%, -50%)'
  const heroDiamondStyle = {
    transform: `${heroBaseTransform} rotate(45deg) translateY(${(mousePosition.y - 50) * 0.1}px) translateX(${(mousePosition.x - 50) * 0.05}px)`,
    transformOrigin: 'center',
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
              <img src="/assets/Images/white_logoo.png" alt="Urban Desiii Logo" className="logo-image" />
              <span className="logo-text">Urban Desiii</span>
            </div>
          </div>
          <button 
            className="mobile-menu-toggle"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="Toggle menu"
          >
            <span className={mobileMenuOpen ? 'hamburger open' : 'hamburger'}></span>
            <span className={mobileMenuOpen ? 'hamburger open' : 'hamburger'}></span>
            <span className={mobileMenuOpen ? 'hamburger open' : 'hamburger'}></span>
          </button>
          {mobileMenuOpen && (
            <div 
              className="mobile-menu-backdrop" 
              onClick={() => setMobileMenuOpen(false)}
            ></div>
          )}
          <div className={`nav-right ${mobileMenuOpen ? 'mobile-open' : ''}`}>
            <button className="nav-link" onClick={() => { setCurrentPage('home'); setMobileMenuOpen(false); }}>Home</button>
            <button className="nav-link" onClick={() => { setCurrentPage('about'); setMobileMenuOpen(false); }}>About</button>
            <button className="nav-link" onClick={() => { setCurrentPage('service'); setMobileMenuOpen(false); }}>Service</button>
            <button className="nav-link" onClick={() => { setCurrentPage('contact'); setMobileMenuOpen(false); }}>Contact</button>
            <button className="nav-link" onClick={() => { setCurrentPage('subscribe'); setMobileMenuOpen(false); }}>Subscribe</button>
          </div>
        </header>

        {currentPage === 'contact' ? <ContactPage /> : 
         currentPage === 'subscribe' ? <SubscribePage /> : 
         currentPage === 'about' ? <AboutPage /> :
         currentPage === 'service' ? <ServicePage /> : (
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
                  <button className="btn btn-primary hero-cta animate-bounce-in" onClick={() => setCurrentPage('subscribe')}>
                    Get Started Now
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
              <a href='https://www.tiktok.com/@urbandesiii' target="_blank" rel="noopener noreferrer">
                <div className="hero-floating hero-floating--top animate-float" data-animate-child style={{ animationDelay: '0.8s' }}>
                  <div className="floating-icon"><img src='/assets/Images/tiktok-256.png' alt="tiktok"/></div>
                  <div className="floating-text">
                    <div className="floating-title">Tik-tok</div>
                  </div>
                </div>
              </a>
               <a href='https://www.instagram.com/urbandesiii/?hl=en' className="hero-floating hero-floating--right animate-float" data-animate-child style={{ animationDelay: '1s', textDecoration: 'none' }}>
                  <div className="floating-icon">
                    <img src='/assets/Images/instagram.png' alt='Instagram'/>
                  </div>
                  <div className="floating-text">
                    <div className="floating-title">Instagram</div>
                  </div>
                </a>

                <a href='https://www.linkedin.com/company/urban-desiii/' className="hero-floating hero-floating--bottom animate-float" data-animate-child style={{ animationDelay: '1.2s', textDecoration: 'none' }}>
                  <div className="floating-icon">
                    <img src='/assets/Images/linkedin.png' alt='LinkedIn'/>
                  </div>
                  <div className="floating-text">
                    <div className="floating-title">LinkedIn</div>
                  </div>
                </a>

                <div className="hero-card animate-card-hover hero-card-delayed" data-animate-child style={{ animationDelay: '1.5s' }}>
                  <div className="hero-card-image">
                    <img 
                      src="/assets/Images/@urbandesiii.png" 
                      alt="Urban Desiii Profile" 
                      className="hero-card-profile-image"
                    />
                  </div>
                  <div className="creator-header">
                    <div>
                      <div className="creator-name">Urban Desiii</div>
                      <div className="creator-handle">@urbandesiii</div>
                    </div>
                  </div>
                  <div className="creator-tags">
                    <a href='https://www.tiktok.com/@urbandesiii'><span className="tag-item">Tik-tok</span></a>
                    <a href='https://www.instagram.com/urbandesiii/?hl=en'><span className="tag-item">Instagram</span></a>
                    <a href='https://www.linkedin.com/company/urban-desiii/'><span className="tag-item">LinkedIn</span></a>
                  </div>
                  <div className="creator-stat-row">
                    <span>Join To Grow As a Creator</span>
                    <span className="creator-pill animate-typing">urbandesiii.com/creators/growingplatform</span>
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
                  >
                    <div className="video-container">
                      <video
                        ref={el => videoRefs.current[index] = el}
                        src={video.videoUrl}
                        className="video-element"
                        autoPlay
                        muted
                        loop
                        playsInline
                        // poster={video.thumbnail}
                      />

                    </div>
                  </div>
                ))}
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
                <img src="/assets/Images/white_logoo.png" alt="Urban Desiii Logo" className="logo-image small" />
                <span className="logo-text">Urban Desiii</span>
              </div>
            </div>
            <div className="footer-columns">
              {[
                { 
                  title: "Quick Links", 
                  links: [
                    { name: "Home", action: () => scrollToSection('') },
                    { name: "About", action: () => setCurrentPage('about') },
                    { name: "Services", action: () => setCurrentPage('service') },
                    { name: "Contact", action: () => setCurrentPage('contact') },
                    { name: "Subscribe", action: () => setCurrentPage('subscribe') }
                  ]
                },
                { title: "Resources", links: ["Blog", "FAQ", "Tutorials", "Case Studies", "Documentation"] },
                { title: "Legal", links: ["Privacy Policy", "Terms of Service", "Cookie Policy", "Disclaimer"] },
                { 
                  title: "Connect", 
                  links: [
                    { name: "Instagram", url: "https://www.instagram.com/urbandesiii/" },
                    { name: "TikTok", url: "https://www.tiktok.com/" },
                    { name: "LinkedIn", url: "https://www.linkedin.com/company/urban-desiii/" },
                    { name: "Email", url: "mailto:urbandesiii.business@gmail.com" },
                    { name: "YouTube", url: "https://www.youtube.com/@ashnaparikh" }
                  ]
                },
                { 
                  title: "Support", 
                  links: [
                    { name: "Help Center", action: () => setCurrentPage('contact') },
                    { name: "Contact Us", action: () => setCurrentPage('contact') },
                    { name: "Report Issue", action: () => setCurrentPage('contact') },
                    { name: "Feedback", action: () => setCurrentPage('contact') },
                    { name: "Status", action: () => setCurrentPage('contact') }
                  ]
                }
              ].map((col, colIndex) => (
                <div 
                  key={colIndex} 
                  className={`footer-col ${col.title === "Quick Links" ? "footer-col-quick" : ""} ${col.title === "Support" ? "footer-col-support" : ""}`} 
                  data-animate="fade-up" 
                  data-animate-child
                >
                  <h4>{col.title}</h4>
                  {col.links.map((link, linkIndex) => {
                    if (typeof link === 'string') {
                      return (
                        <a key={linkIndex} href="#" className="footer-link" onClick={(e) => e.preventDefault()}>
                          {link}
                        </a>
                      )
                    } else if (link.url) {
                      return (
                        <a 
                          key={linkIndex} 
                          href={link.url} 
                          className="footer-link" 
                          target="_blank" 
                          rel="noopener noreferrer"
                        >
                          {link.name}
                        </a>
                      )
                    } else if (link.action) {
                      return (
                        <button 
                          key={linkIndex} 
                          onClick={link.action}
                          className="footer-link"
                          style={{ background: 'none', border: 'none', cursor: 'pointer', textAlign: 'center', width: '100%', padding: 0 }}
                        >
                          {link.name}
                        </button>
                      )
                    }
                  })}
                </div>
              ))}
            </div>
          </div>
          <div className="footer-bottom">
            <span> 2023 Urban Desiii. All rights reserved.</span>
            <span>© {new Date().getFullYear()} Urban Desiii. All rights reserved.</span>
          </div>
        </div>
      </footer>
    </>
  )
}

export default App