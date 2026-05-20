import { motion } from 'framer-motion';
import './About.css';

export default function About() {
  return (
    <section id="about">
      <div className="sec-header">
        <span className="sec-num">07</span>
        <span className="sec-title">About the Analyst</span>
      </div>

      <div className="about-layout">
        <motion.div
          className="about-image-col"
          initial={{ opacity: 0, x: -30 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          viewport={{ once: true, amount: 0.3 }}
        >
          <img src="/profile.png" alt="Analyst Profile" className="profile-img" />
        </motion.div>

        <motion.div
          className="about-text-col"
          initial={{ opacity: 0, x: 30 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, ease: "easeOut", delay: 0.2 }}
          viewport={{ once: true, amount: 0.3 }}
        >
          <h2 className="about-title">Anshuman Maharana</h2>
          <p className="about-desc">
            I am Anshuman, a developer driven by a deep curiosity for building intelligent, data-centric systems. My career focus centers on the intersection of machine learning, algorithmic efficiency, and full-stack web development. I thrive on translating complex technical challenges—ranging from reinforcement learning agents to large-scale data analytics—into seamless, user-centric applications.
          </p>
          <p className="about-desc">
            My interests lie in bridging the gap between theoretical computer science and practical innovation. Whether I am optimizing pathfinding algorithms or architecting agentic workflows using generative AI, I am committed to writing clean, scalable, and impactful code. I am constantly refining my development toolkit to create intuitive digital experiences that transform raw data into actionable intelligence.
          </p>
          <div className="about-contact">
            <a href="mailto:maharanaanshuman01@gmail.com" className="contact-btn">Get in Touch</a>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
