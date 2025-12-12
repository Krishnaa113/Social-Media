const SignInPage = () => (
  <main className="signin-page">
    <section className="signin-container" data-animate="fade-up">
      <div className="signin-form-wrapper animate-float-gentle">
        <h1 className="signin-title animate-title-in">Welcome to UrbanDesiii</h1>
        
        <form className="signin-form" data-animate="fade-up">
          <div className="signin-form-group animate-slide-in" style={{ animationDelay: '0.2s' }}>
            <input 
              type="email" 
              name="email" 
              placeholder="Email" 
              className="signin-input"
              required 
            />
          </div>

          <div className="signin-form-group animate-slide-in" style={{ animationDelay: '0.4s' }}>
            <label htmlFor="password" className="signin-label">Password</label>
            <input 
              type="password" 
              id="password"
              name="password" 
              placeholder="Password" 
              className="signin-input"
              required 
            />
          </div>

          <button type="submit" className="signin-button animate-button-in" style={{ animationDelay: '0.6s' }}>Sign in</button>
        </form>

        <div className="signin-links animate-fade-in" style={{ animationDelay: '0.8s' }}>
          <a href="#" className="signin-link">Forgot Password?</a>
          <a href="#" className="signin-link">Create account</a>
        </div>
      </div>
    </section>
  </main>
)

export default SignInPage

