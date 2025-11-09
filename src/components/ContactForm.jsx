import React, { useState } from "react";
import "../styles/ContactForm.css";
import logo from "../assets/logoedit.png";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


function ContactForm() {
  const [username, setUserName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [usermsg, setUserMessage] = useState("");
  const [loading, setLoading] = useState(false); // loading state

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!username || !email || !usermsg) {
      toast.error("Please fill all required fields.");
      return;
    }

    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailPattern.test(email)) {
      toast.error("Please enter a valid email address.");
      return;
    }

    const formData = { name: username, email, phone, message: usermsg };

    try {
      setLoading(true); // start loading
      const response = await fetch(
        "https://vernanbackend.ezlab.in/api/contact-us/",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(formData),
        }
      );

      if (response.ok) {
        toast.success("Form Submitted Successfully!");
        setUserName("");
        setEmail("");
        setPhone("");
        setUserMessage("");
      } else {
        toast.error("Submission failed. Please try again");
      }
    } catch (error) {
      console.error("Error submitting form:", error);
      toast.error("Network error. Please try again");
    } finally {
      setLoading(false); // stop loading always
    }
  };

  return (
    <div className="contact-container">
      <div className="contact-form-card">
        <div className="upper-container">
          <h3 className="heading">Join the Story</h3>
          <p className="subheading">
            Ready to bring your vision to life? Let's talk
          </p>
        </div>

        <div className="form-container">
          <form onSubmit={handleSubmit} className="contact-form">
            <input
              type="text"
              value={username}
              onChange={(e) => setUserName(e.target.value)}
              placeholder="Your name*"
              required
              disabled={loading ? true : false} // optional
            />
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Your email*"
              required
              disabled={loading ? true : false} // optional
            />
            <input
              type="tel"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              placeholder="Phone"
              disabled={loading ? true : false} // optional
            />
            <textarea
              value={usermsg}
              onChange={(e) => setUserMessage(e.target.value)}
              placeholder="Your message*"
              required
              className="textarea"
              disabled={loading ? true : false} // optional
            />

            <div>
              <button type="submit" disabled={loading}>
                {loading ? "Submitting..." : "Submit"}
              </button>
            </div>
          </form>
        </div>

        <div>
          <p className="contact-info">
            <a
              href="https://mail.google.com/mail/?view=cm&fs=1&to=vernita@varnanfilms.co.in"
              target="_blank"
              rel="noopener noreferrer"
              className="email-link"
            >
              vernita@varnanfilms.co.in
            </a>
            <span className="seperator"></span>
            <a href="tel:+919873684567" className="phone-link">
              +91 9873684567
            </a>
          </p>


        </div>
      </div>

      <div className="description-container">
        <p className="description">
          Whether you have an idea, a question, or simply want to explore how V can work together, V’re just a message away.<br></br>Let’s catch up over coffee.<br></br>Great stories always begin with a good conversation
        </p>

      </div>

      <div className="navbar">
        <img src={logo} alt="VFilms Logo" className="logo" />
      </div>

      <div className="scrollbar"></div>

      <ToastContainer
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        pauseOnHover
        draggable
        theme="colored"
      />
    </div>
  );
}

export default ContactForm;
