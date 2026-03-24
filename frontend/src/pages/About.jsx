import Header from "../components/Header";
import Footer from "../components/Footer";

function About() {
  return (
    <>
      <Header />

      <main className="main container">
        <div style={{ textAlign: "center" }}>
          <h1>Contact Us</h1>
          <p>We would love to hear from you!</p>
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