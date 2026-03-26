import Header from "../components/Header";
import Footer from "../components/Footer";

function About() {
  return (
    <>
      <Header />

      <main className="main container">
        <div className="center">
          <h1>Contact Us</h1>

          {/* CAR SVG ICON */}
          <div className="icon-box">
            <svg viewBox="0 0 576 512">
              <path d="M499.94 152.02l-23.73-83.1c-1.39-4.88-5.74-8.49-10.74-9.52L304.83 49.33c-3.11-.62-6.29-.62-9.4 0L112.53 59.4c-5.01 1.03-9.36 4.64-10.74 9.52L78.06 152.02l43.83-12.28L499.94 152.02zM128 352c0 35.35-28.65 64-64 64S0 387.35 0 352s28.65-64 64-64s64 28.65 64 64zm448 0c0 35.35-28.65 64-64 64s-64-28.65-64-64s28.65-64 64-64s64 28.65 64 64zM432 245.91l-105.77-50.59-19.16-10.42a15.86 15.86 0 00-14.88 0l-19.16 10.42L144 245.91V288h288z" />
            </svg>
          </div>

          <p className="subtitle">We would love to hear from you!</p>
        </div>

        <div className="grid">
          <div>
            <h2>Our Office</h2>
            <p>123 Auto Avenue</p>
            <p>Manga Land</p>
          </div>

          <div>
            <h2>Email & Phone</h2>
            <p>info@mangaauto.com</p>
            <p>+234 80 1234 5678</p>
          </div>
        </div>

        {/* FORM */}
        <div className="form-card">
          <h2>Send Us a Message</h2>

          <form
            onSubmit={(e) => {
              e.preventDefault();
              alert("Thank you for your message!");
              e.target.reset();
            }}
          >
            <div className="form-group">
              <label>Your Name</label>
              <input type="text" required />
            </div>

            <div className="form-group">
              <label>Your Email</label>
              <input type="email" required />
            </div>

            <div className="form-group">
              <label>Message</label>
              <textarea rows="4"></textarea>
            </div>

            <button type="submit">Send Message</button>
          </form>
        </div>
      </main>

      <Footer />
    </>
  );
}

export default About;