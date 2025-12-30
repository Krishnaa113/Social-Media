
// import { useEffect, useState, useCallback, useRef } from 'react'
// import ContactPage from './pages/Contact'
// import SubscribePage from './pages/Subscribe'
// import AboutPage from './pages/About'
// import ServicePage from './pages/Service'
// import InstagramLive from './components/InstagramLive'
// import './App.css'

// function App() {
//   const [currentPage, setCurrentPage] = useState('home')
//   const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })
//   const [heroInView, setHeroInView] = useState(false)
//   const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
//   const [currentSlide, setCurrentSlide] = useState(0)
  
//   const slides = [
//     "/assets/Images/image.png",
//     "/assets/Images/image1.png",
//     "/assets/Images/image3.png",
//     "/assets/Images/image4.png",
//     "/assets/Images/image5.png"
//   ];

//   useEffect(() => {
//     const interval = setInterval(() => {
//       setCurrentSlide((prev) => (prev + 1) % slides.length);
//     }, 3000); // Change slide every 3 seconds
//     return () => clearInterval(interval);
//   }, [slides.length]);

//   const videoRefs = useRef([])

//   // Simple video data with placeholder thumbnails
//   const videoData = [
//     {
//       id: 1,
//       videoUrl: "/assets/Images/hero-video.mp4"
//     },
//     {
//       id: 2,
//       videoUrl: "/assets/Images/hero-video.mp4"
//     },
//     {
//       id: 3,
//       videoUrl: "/assets/Images/hero-video.mp4"
//     },
//     {
//       id: 4,
//       videoUrl: "/assets/Images/hero-video.mp4"
//     }
//   ]

//   // Enhanced mouse tracking for parallax effects
//   const handleMouseMove = useCallback((e) => {
//     setMousePosition({
//       x: (e.clientX / window.innerWidth) * 100,
//       y: (e.clientY / window.innerHeight) * 100
//     })
//   }, [])

//   useEffect(() => {
//     // Reset all animations when page mounts
//     const resetAnimations = () => {
//       const animatedElements = document.querySelectorAll('[data-animate]')
//       animatedElements.forEach(el => {
//         el.classList.remove('in-view')
//       })
//       const childElements = document.querySelectorAll('[data-animate-child]')
//       childElements.forEach(el => {
//         el.classList.remove('animate-child-in')
//       })
//     }

//     resetAnimations()

//     // Enhanced intersection observer with more dynamic animations
//     const observer = new IntersectionObserver(
//       entries => {
//         entries.forEach(entry => {
//           if (entry.isIntersecting) {
//             // Add staggered delays for child elements
//             const children = entry.target.querySelectorAll('[data-animate-child]')
//             children.forEach((child, index) => {
//               setTimeout(() => {
//                 child.classList.add('animate-child-in')
//               }, index * 100)
//             })
            
//             entry.target.classList.add('in-view')
            
//             // Special handling for hero section
//             if (entry.target.classList.contains('hero')) {
//               setHeroInView(true)
//             }
//           }
//         })
//       },
//       {
//         threshold: 0.1,
//         rootMargin: '0px 0px -50px 0px',
//       },
//     )

//     // Small delay to ensure DOM is ready
//     setTimeout(() => {
//       const animated = document.querySelectorAll('[data-animate]')
//       animated.forEach(el => observer.observe(el))
//     }, 100)

//     // Mouse move listener for parallax effects
//     window.addEventListener('mousemove', handleMouseMove)

//     return () => {
//       observer.disconnect()
//       window.removeEventListener('mousemove', handleMouseMove)
//     }
//   }, [handleMouseMove, currentPage])

//   useEffect(() => {
//     const handleScroll = () => {
//       // Add scroll-based parallax to hero elements only
//       const heroVisual = document.querySelector('.hero-visual')
//       const heroDiamond = document.querySelector('.hero-diamond-gray')
//       const heroFloating = document.querySelectorAll('.hero-floating')
      
//       if (heroVisual && window.scrollY < window.innerHeight) {
//         const scrollPercent = window.scrollY / window.innerHeight
        
//         if (heroDiamond) {
//           const base = 'translate(-50%, -50%)'
//           heroDiamond.style.transform = `${base} rotate(45deg) translateY(${scrollPercent * 30}px)`
//         }
        
//         heroFloating.forEach((floating, index) => {
//           floating.style.transform = `translateY(${scrollPercent * (10 + index * 5)}px)`
//         })
//       }
//     }

//     handleScroll()
//     window.addEventListener('scroll', handleScroll, { passive: true })
//     return () => window.removeEventListener('scroll', handleScroll)
//   }, [])

//   // Dynamic hero diamond style based on mouse position
//   const heroBaseTransform = 'translate(-50%, -50%)'
//   const heroDiamondStyle = {
//     transform: `${heroBaseTransform} rotate(45deg) translateY(${(mousePosition.y - 50) * 0.1}px) translateX(${(mousePosition.x - 50) * 0.05}px)`,
//     transformOrigin: 'center',
//     filter: `brightness(${100 + mousePosition.x * 0.2}%)`
//   }

//   // Function to scroll to specific section
//   const scrollToSection = (sectionId) => {
//     const element = document.getElementById(sectionId)
//     if (element) {
//       element.scrollIntoView({ behavior: 'smooth' })
//     } else {
//       window.scrollTo({ top: 0, behavior: 'smooth' })
//     }
//     setCurrentPage('home')
//   }

//   return (
//     <>
//       <div className="page">
//         <header className="navbar">
//           <div className="nav-left">
//             <div 
//               className="logo-container"
//               onClick={() => {
//                 setCurrentPage('home')
//                 window.scrollTo({ top: 0, behavior: 'smooth' })
//               }}
//               style={{ cursor: 'pointer' }}
//             >
//               <img src="/assets/Images/white_logoo.png" alt="Urban Desiii Logo" className="logo-image" />
//               <span className="logo-text">Urban Desiii</span>
//             </div>

//           </div>
//           <button 
//             className="mobile-menu-toggle"
//             onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
//             aria-label="Toggle menu"
//           >
//             <span className={mobileMenuOpen ? 'hamburger open' : 'hamburger'}></span>
//             <span className={mobileMenuOpen ? 'hamburger open' : 'hamburger'}></span>
//             <span className={mobileMenuOpen ? 'hamburger open' : 'hamburger'}></span>
//           </button>
//           {mobileMenuOpen && (
//             <div 
//               className="mobile-menu-backdrop" 
//               onClick={() => setMobileMenuOpen(false)}
//             ></div>
//           )}
//           <div className={`nav-right ${mobileMenuOpen ? 'mobile-open' : ''}`}>
//             <button className="nav-link" onClick={() => { setCurrentPage('home'); setMobileMenuOpen(false); }}>Home</button>
//             <button className="nav-link" onClick={() => { setCurrentPage('about'); setMobileMenuOpen(false); }}>About</button>
//             <button className="nav-link" onClick={() => { setCurrentPage('service'); setMobileMenuOpen(false); }}>Service</button>
//             <button className="nav-link" onClick={() => { setCurrentPage('contact'); setMobileMenuOpen(false); }}>Contact</button>
//             <button className="nav-link" onClick={() => { setCurrentPage('subscribe'); setMobileMenuOpen(false); }}>Subscribe</button>
//           </div>
//         </header>

//         {currentPage === 'contact' ? <ContactPage /> : 
//          currentPage === 'subscribe' ? <SubscribePage /> : 
//          currentPage === 'about' ? <AboutPage /> :
//          currentPage === 'service' ? <ServicePage /> : (
//           <main>
//             {/* Enhanced Hero */}
//             <section className="hero" data-animate="fade-up">
//               <div className="hero-content">
//                 <p className="hero-kicker" data-animate-child>The First South Asian Influencer Marketing Agency</p>
//                 <h1 data-animate-child>
//                   <span className="hero-text-reveal">The First South Asian <span style={{ display: 'inline-block', marginLeft: '0.5rem' }}>Influencer</span></span>
//                   <br />
//                   <span className="hero-text-reveal" style={{ animationDelay: '0.2s' }}>Marketing</span>
//                   <br />
//                   <span className="hero-text-reveal" style={{ animationDelay: '0.4s' }}>Agency</span>
//                 </h1>
//                 <p className="hero-sub" data-animate-child>
//                   SOCIAL MEDIA + MARKETING AGENCY | BRAND + INFLUENCER MANAGEMENT
//                 </p>
//                 <div className="hero-actions" data-animate-child>
//                   <button className="btn btn-primary hero-cta animate-bounce-in" onClick={() => setCurrentPage('contact')}>
//                     Book a free consultant with our social media experts
//                     <span className="btn-shine"></span>
//                   </button>
//                 </div>
//               </div>

//               <div className="hero-visual" data-animate="fade-left">
//                 {/* Gray diamond shape with Instagram Live inside */}
//                 <div className="hero-diamond-gray" data-animate-child style={heroDiamondStyle}>
//                   <div className="instagram-live-diamond">
//                     <InstagramLive />
//                   </div>
//                 </div>
                
//                 <a href='https://www.tiktok.com/@urbandesiii' target="_blank" rel="noopener noreferrer">
//                   <div className="hero-floating hero-floating--top animate-float" data-animate-child style={{ animationDelay: '0.8s' }}>
//                     <div className="floating-icon"><img src='/assets/Images/tiktok-256.png' alt="tiktok"/></div>
//                     <div className="floating-text">
//                       <div className="floating-title">Tik-tok</div>
//                     </div>
//                   </div>
//                 </a>
//                 <a href='https://www.instagram.com/urbandesiii/?hl=en' className="hero-floating hero-floating--right animate-float" data-animate-child style={{ animationDelay: '1s', textDecoration: 'none' }}>
//                   <div className="floating-icon">
//                     <img src='/assets/Images/instagram.png' alt='Instagram'/>
//                   </div>
//                   <div className="floating-text">
//                     <div className="floating-title">Instagram</div>
//                   </div>
//                 </a>

//                 <a href='https://www.linkedin.com/company/urban-desiii/' className="hero-floating hero-floating--bottom animate-float" data-animate-child style={{ animationDelay: '1.2s', textDecoration: 'none' }}>
//                   <div className="floating-icon">
//                     <img src='/assets/Images/linkedin.png' alt='LinkedIn'/>
//                   </div>
//                   <div className="floating-text">
//                     <div className="floating-title">LinkedIn</div>
//                   </div>
//                 </a>

//                 {/* Removed separate Instagram Live Feed div */}

//                 <div className="hero-card animate-card-hover hero-card-delayed" data-animate-child style={{ animationDelay: '1.5s' }}>
//                   <div className="hero-card-image">
//                     <img 
//                       src={slides[currentSlide]} 
//                       alt={`Slide ${currentSlide + 1}`} 
//                       className="hero-card-profile-image"
//                     />
//                   </div>
//                   <div className="creator-header">
//                     <div>
//                       <div className="creator-name">Urban Desiii @Live Feed</div>
//                     </div>
//                   </div>      
//                 </div>
//               </div>
//             </section>

//             {/* Simple Video Gallery Section */}
//             <section className="video-gallery" data-animate="fade-up">
//               <div className="video-gallery-header" data-animate-child>
//                 <h2>Subscribe to Urban Desiii</h2>
//               </div>
              
//               <div className="video-grid" data-animate-child>
//                 {videoData.map((video, index) => (
//                   <div 
//                     key={video.id} 
//                     className="video-card"
//                     data-animate="fade-up"
//                     data-animate-child
//                     style={{ animationDelay: `${index * 0.1}s` }}
//                   >
//                     <div className="video-container">
//                       <video
//                         ref={el => videoRefs.current[index] = el}
//                         src={video.videoUrl}
//                         className="video-element"
//                         autoPlay
//                         muted
//                         loop
//                         playsInline
//                       />
//                     </div>
//                   </div>
//                 ))}
//               </div>
//             </section>
//           </main>
//         )}
//       </div>
      
//       {/* Footer moved outside the .page container */}
//       <footer className="footer" data-animate="fade-up">
//         <div className="footer-content">
//           <div className="footer-top">
//             <div className="footer-brand-container">
//               <div className="footer-brand" data-animate="fade-up" data-animate-child>
//                 <div className="logo-container-small">
//                   <img src="/assets/Images/white_logoo.png" alt="Urban Desiii Logo" className="logo-image small" />
//                   <span className="logo-text">Urban Desiii</span>
//                 </div>
//               </div>
              
//               <div className="email-signup">
//                 <p className="signup-text">Join our email list</p>
//                 <p className="signup-subtext">Sign up with your email address to receive news and updates.</p>
//                 <div className="signup-form">
//                   <input 
//                     type="email" 
//                     placeholder="Email Address" 
//                     className="email-input"
//                     aria-label="Email Address"
//                   />
//                   <button className="signup-button">Sign Up</button>
//                 </div>
//                 <p className="privacy-text">We respect your privacy.</p>
//               </div>
//             </div>
//             <div className="footer-columns">
//               {[
//                 { 
//                   title: "FOLLOW", 
//                   links: [
//                     { name: "Instagram", url: "https://www.instagram.com/urbandesiii/", icon: "fab fa-instagram" },
//                     { name: "TikTok", url: "https://www.tiktok.com/", icon: "fab fa-tiktok" },
//                     { name: "LinkedIn", url: "https://www.linkedin.com/company/urban-desiii/", icon: "fab fa-linkedin-in" },
//                     { name: "Email", url: "mailto:urbandesiii.business@gmail.com", icon: "far fa-envelope" },
//                     { name: "YouTube", url: "https://www.youtube.com/@ashnaparikh", icon: "fab fa-youtube" }
//                   ]
//                 }
//               ].map((col, colIndex) => (
//                 <div 
//                   key={colIndex} 
//                   className={`footer-col ${col.title === "Quick Links" ? "footer-col-quick" : ""} ${col.title === "Support" ? "footer-col-support" : ""} ${col.title === "FOLLOW" ? "footer-col-follow" : ""}`} 
//                   data-animate="fade-up" 
//                   data-animate-child
//                 >
//                   <h4>{col.title}</h4>
//                   {col.title === "FOLLOW" ? (
//                     <div className="social-links">
//                       {col.links.map((link, linkIndex) => (
//                         <a 
//                           key={linkIndex} 
//                           href={link.url} 
//                           target="_blank" 
//                           rel="noopener noreferrer"
//                           title={link.name}
//                         >
//                           <i className={link.icon}></i>
//                         </a>
//                       ))}
//                     </div>
//                   ) : (
//                     col.links.map((link, linkIndex) => (
//                       <a 
//                         key={linkIndex} 
//                         href={link.url || '#'} 
//                         target="_blank" 
//                         rel="noopener noreferrer"
//                         onClick={(e) => {
//                           if (link.action) {
//                             e.preventDefault();
//                             link.action();
//                           }
//                         }}
//                       >
//                         {link.name}
//                       </a>
//                     ))
//                   )}
//                 </div>
//               ))}
//             </div>
//           </div>
//           <div className="footer-bottom">
//             <span> 2023 Urban Desiii. All rights reserved.</span>
//           </div>
//         </div>
//       </footer>
//     </>
//   )
// }

// export default App

// 


import { useEffect, useState, useCallback, useRef } from 'react'
import ContactPage from './pages/Contact'
import SubscribePage from './pages/Subscribe'
import AboutPage from './pages/About'
import ServicePage from './pages/Service'
import InstagramLive from './components/InstagramLive'
import './App.css'

function App() {
  const [currentPage, setCurrentPage] = useState('home')
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })
  const [heroInView, setHeroInView] = useState(false)
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  // Remove currentSlide since we're removing auto-scroll
  // const [currentSlide, setCurrentSlide] = useState(0)
  
  // Remove slides array since we're removing auto-scroll
  // const slides = [
  //   "/assets/Images/image.png",
  //   "/assets/Images/image1.png",
  //   "/assets/Images/image3.png",
  //   "/assets/Images/image4.png",
  //   "/assets/Images/image5.png"
  // ];

  // Remove auto-scroll interval effect
  // useEffect(() => {
  //   const interval = setInterval(() => {
  //     setCurrentSlide((prev) => (prev + 1) % slides.length);
  //   }, 3000); // Change slide every 3 seconds
  //   return () => clearInterval(interval);
  // }, [slides.length]);

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
            <div 
              className="logo-container"
              onClick={() => {
                setCurrentPage('home')
                window.scrollTo({ top: 0, behavior: 'smooth' })
              }}
              style={{ cursor: 'pointer' }}
            >
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
            <button className="nav-link" onClick={() => { setCurrentPage('service'); setMobileMenuOpen(false); }}>Services</button>
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
                <p className="hero-kicker" data-animate-child>The First South Asian Influencer Marketing Agency</p>
                <h1 data-animate-child>
                  <span className="hero-text-reveal">The First South Asian <span style={{ display: 'inline-block', marginLeft: '0.5rem' }}>Influencer</span></span>
                  <br />
                  <span className="hero-text-reveal" style={{ animationDelay: '0.2s' }}>Marketing</span>
                  <br />
                  <span className="hero-text-reveal" style={{ animationDelay: '0.4s' }}>Agency</span>
                </h1>
                <p className="hero-sub" data-animate-child>
                  SOCIAL MEDIA + MARKETING AGENCY | BRAND + INFLUENCER MANAGEMENT
                </p>
                <div className="hero-actions" data-animate-child>
                  <button className="btn btn-primary hero-cta animate-bounce-in" onClick={() => setCurrentPage('contact')}>
                    Book a free consultant with our social media experts
                    <span className="btn-shine"></span>
                  </button>
                </div>
              </div>

              <div className="hero-visual" data-animate="fade-left">
                {/* Gray diamond shape with Instagram Live inside */}
                <div className="hero-diamond-gray" data-animate-child style={heroDiamondStyle}>
                  <div className="instagram-live-diamond">
                    <InstagramLive />
                  </div>
                </div>
                
                <a href='https://www.tiktok.com/@urbandesiii' target="_blank" rel="noopener noreferrer" className="hero-floating hero-floating--left animate-float" data-animate-child style={{ animationDelay: '0.8s' }}>
                  <div className="floating-icon"><img src='/assets/Images/tiktok-256.png' alt="tiktok"/></div>
                  <div className="floating-text">
                    <div className="floating-title">Tik-tok</div>
                  </div>
                </a>

                <a href='https://www.linkedin.com/company/urban-desiii/' className="hero-floating hero-floating--right animate-float" data-animate-child style={{ animationDelay: '1s', textDecoration: 'none' }}>
                  <div className="floating-icon">
                    <img src='/assets/Images/linkedin.png' alt='LinkedIn'/>
                  </div>
                  <div className="floating-text">
                    <div className="floating-title">LinkedIn</div>
                  </div>
                </a>

                
              </div>
            </section>

            {/* Simple Video Gallery Section */}
            <section className="video-gallery" data-animate="fade-up">
              <div className="video-gallery-header" data-animate-child>
                <h2>Subscribe to Urban Desiii</h2>
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
            <div className="footer-brand-container">
              <div className="footer-brand" data-animate="fade-up" data-animate-child>
                <div className="logo-container-small">
                  <img src="/assets/Images/white_logoo.png" alt="Urban Desiii Logo" className="logo-image small" />
                  <span className="logo-text">Urban Desiii</span>
                </div>
              </div>
              
              <div className="email-signup">
                <p className="signup-text">Join our email list</p>
                <p className="signup-subtext">Sign up with your email address to receive news and updates.</p>
                <div className="signup-form">
                  <input 
                    type="email" 
                    placeholder="Email Address" 
                    className="email-input"
                    aria-label="Email Address"
                  />
                  <button className="signup-button">Sign Up</button>
                </div>
                <p className="privacy-text">We respect your privacy.</p>
              </div>
            </div>
            <div className="footer-columns">
              {[

                { 
                  title: "FOLLOW", 
                  links: [
                    { name: "Instagram", url: "https://www.instagram.com/urbandesiii/", icon: "fab fa-instagram" },
                    { name: "TikTok", url: "https://www.tiktok.com/", icon: "fab fa-tiktok" },
                    { name: "LinkedIn", url: "https://www.linkedin.com/company/urban-desiii/", icon: "fab fa-linkedin-in" },
                    { name: "Email", url: "mailto:urbandesiii.business@gmail.com", icon: "far fa-envelope" },
                    { name: "YouTube", url: "https://www.youtube.com/@ashnaparikh", icon: "fab fa-youtube" }
                  ]
                }
              ].map((col, colIndex) => (
                <div 
                  key={colIndex} 
                  className={`footer-col ${col.title === "Quick Links" ? "footer-col-quick" : ""} ${col.title === "Support" ? "footer-col-support" : ""} ${col.title === "FOLLOW" ? "footer-col-follow" : ""}`} 
                  data-animate="fade-up" 
                  data-animate-child
                >
                  <h4>{col.title}</h4>
                  {col.title === "FOLLOW" ? (
                    <div className="social-links">
                      {col.links.map((link, linkIndex) => (
                        <a 
                          key={linkIndex} 
                          href={link.url} 
                          target="_blank" 
                          rel="noopener noreferrer"
                          title={link.name}
                        >
                          <i className={link.icon}></i>
                        </a>
                      ))}
                    </div>
                  ) : (
                    col.links.map((link, linkIndex) => (
                      <a 
                        key={linkIndex} 
                        href={link.url || '#'} 
                        target="_blank" 
                        rel="noopener noreferrer"
                        onClick={(e) => {
                          if (link.action) {
                            e.preventDefault();
                            link.action();
                          }
                        }}
                      >
                        {link.name}
                      </a>
                    ))
                  )}
                </div>
              ))}
            </div>
          </div>
          <div className="footer-bottom">
            <span> 2023 Urban Desiii. All rights reserved.</span>
          </div>
        </div>
      </footer>
    </>
  )
}

export default App