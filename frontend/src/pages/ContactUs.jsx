import React, { useState } from "react";
import axios from "axios";
import styles from "../styles/contact.module.css"; 
import { IconButton } from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { useNavigate } from "react-router-dom";
import Footer from "./Footer";


const Contact = () => {

    const navigate=useNavigate();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });
  const [status, setStatus] = useState("");

  const handleChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post("http://localhost:8080/api/v1/contact", formData);
      setStatus("Message sent successfully!");
      setFormData({ name: "", email: "", subject: "", message: "" });
    } catch (error) {
      setStatus("Error sending message. Try again!");
    }
  };

  return (
    <>
    <div className={styles.page}>
      <div className={styles.header}>
        <IconButton
                onClick={() => navigate("/")}
                style={{ position: "absolute", top: 20, left: 20 }}
              >
                <ArrowBackIcon style={{ fontSize: "30px", color: "#333" }} />
              </IconButton>
        <h1 className={styles.headerTitle}>Contact SyncTalk Support</h1>
        <p className={styles.headerSub}>
          We're here to help you with video calls, meetings, and technical issues.
        </p>
      </div>

      <div className={styles.mainContainer}>
        <div className={styles.formCard}>
          <h2 className={styles.cardTitle}>Send us a message</h2>
          <form onSubmit={handleSubmit} className={styles.form}>
            <input
              name="name"
              placeholder="Your Name"
              value={formData.name}
              onChange={handleChange}
              className={styles.input}
              required
            />
            <input
              name="email"
              type="email"
              placeholder="Your Email"
              value={formData.email}
              onChange={handleChange}
              className={styles.input}
              required
            />
            <input
              name="subject"
              placeholder="Subject"
              value={formData.subject}
              onChange={handleChange}
              className={styles.input}
            />
            <textarea
              name="message"
              placeholder="Message"
              value={formData.message}
              onChange={handleChange}
              className={styles.textarea}
              required
            />
            <button type="submit" className={styles.button}>
              Send Message
            </button>
          </form>

          {status && <p className={styles.status}>{status}</p>}
        </div>

        <div className={styles.infoBox}>
          <h2 className={styles.infoTitle}>Support Information</h2>
          <p><strong>Email:</strong> support@synctalk.com</p>
          <p><strong>Phone:</strong> +1 800 234 5678</p>
          <p style={{ marginTop: "20px" }}><strong>Common Issues We Help With:</strong></p>
          <ul className={styles.list}>
            <li>🔵 Camera not working</li>
            <li>🔵 Microphone or audio issues</li>
            <li>🔵 Screen sharing problems</li>
            <li>🔵 Poor video quality</li>
            <li>🔵 Login or password reset</li>
          </ul>
        </div>
      </div>
    </div>
    <Footer/>
    </>
  );
};

export default Contact;
