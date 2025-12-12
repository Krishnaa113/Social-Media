const SubscribePage = () => (
  <main className="subscribe-page">
    <section className="subscribe-hero" data-animate="fade-up">
      <div className="subscribe-form-container">
        <form className="subscribe-form" data-animate="fade-up">
          <div className="form-grid">
            <label className="form-field">
              <span>Name (required)</span>
              <div className="split-inputs">
                <input type="text" name="firstName" placeholder="First Name" required />
                <input type="text" name="lastName" placeholder="Last Name" required />
              </div>
            </label>

            <label className="form-field">
              <span>Email (required)</span>
              <input type="email" name="email" placeholder="Email" required />
            </label>

            <label className="form-field">
              <span>Content Niche (required)</span>
              <input 
                type="text" 
                name="niche" 
                placeholder="Content Niche (ex: lifestyle, beauty, etc.)" 
                required 
              />
            </label>

            <label className="form-field">
              <span>Social Media Handles (required)</span>
              <textarea 
                name="handles" 
                rows="6" 
                placeholder="Enter your social media handles" 
                required 
                className="textarea-resizable"
              />
            </label>
          </div>

          <button type="submit" className="btn btn-primary full-width">Submit</button>
        </form>
      </div>

      <div className="subscribe-details" data-animate="fade-up">
        <div className="subscription-image-container">
          <div className="subscription-image-overlay">
            <h2 className="subscription-title">Monthly Subscription</h2>
          </div>
        </div>
        <div className="subscription-content">
          <div className="subscription-price">$10.00 /month</div>
          <ul className="subscription-features">
            <li className="feature-item">
              <span className="check-icon">✓</span>
              <span>WEEKLY trend reports - includes trending audios and content</span>
            </li>
            <li className="feature-item">
              <span className="check-icon">✓</span>
              <span>Tailored content ideas for your target audience & niche</span>
            </li>
            <li className="feature-item">
              <span className="check-icon">✓</span>
              <span>Direct 1-1 access to our managers & social media experts</span>
            </li>
            <li className="feature-item">
              <span className="check-icon">✓</span>
              <span>Customized content & growth plans (we will tell you exactly what & when to post)</span>
            </li>
            <li className="feature-item">
              <span className="check-icon">✓</span>
              <span>First hand access to brand deals, UGC, and events that collaborate with Urban Desiii.</span>
            </li>
          </ul>
        </div>
      </div>
    </section>
  </main>
)

export default SubscribePage

