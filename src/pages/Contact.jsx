const ContactPage = () => (
  <main className="contact-page">
    <section className="contact-hero" data-animate="fade-up">
      <div className="contact-copy">
        <p className="contact-kicker">Book your consultation</p>
        <h1>Let&apos;s plan your growth</h1>
        <p className="contact-desc">
          Our consultations are 15-20 minute phone calls, where we discuss your goals, budget, and overall plan.
          We invite you to ask questions, and take full advantage of creating a growth strategy for your brand.
        </p>
        <p className="contact-desc">
          Please leave us a brief description so we can properly prepare for your consultation.
        </p>
      </div>

      <form className="contact-form card-hover-effect" data-animate="fade-up">
        <div className="form-grid">
          <label className="form-field">
            <span>Name (required)</span>
            <div className="split-inputs">
              <input type="text" name="firstName" placeholder="First Name" required />
              <input type="text" name="lastName" placeholder="Last Name" required />
            </div>
          </label>

          <label className="form-field">
            <span>Phone (required)</span>
            <div className="split-inputs">
              <select name="country" defaultValue="United States" required>
                <option>United States</option>
                <option>Canada</option>
                <option>United Kingdom</option>
                <option>Australia</option>
              </select>
              <input type="tel" name="phone" placeholder="+1" required />
            </div>
          </label>

          <label className="form-field">
            <span>Your Social Media Handle(s) (required)</span>
            <input type="text" name="handles" placeholder="@yourhandle" required className="input-tall" />
          </label>

          <label className="form-field">
            <span>Email (required)</span>
            <input type="email" name="email" placeholder="you@example.com" required />
          </label>

          <label className="form-field">
            <span>Message (required)</span>
            <textarea name="message" rows="4" placeholder="Tell us about your goals" required />
          </label>
        </div>

        <button type="submit" className="btn btn-primary full-width">Submit</button>
      </form>
    </section>
  </main>
)

export default ContactPage

