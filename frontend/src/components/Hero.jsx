import { motion } from 'framer-motion';
import { HERO_PILLS } from '../data/staticConstants';
import './Hero.css';

const container = {
  hidden: {},
  show: { transition: { staggerChildren: 0.12 } },
};

const item = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: 'easeOut' } },
};

export default function Hero() {
  return (
    <section id="hero" className="hero">
      <motion.div
        className="hero-content"
        variants={container}
        initial="hidden"
        animate="show"
      >
        <motion.div className="hero-tag" variants={item}>
          <div className="tag-line" />
          <span>ANALYTICS REPORT · EUROPEAN RETAIL BANKING</span>
        </motion.div>

        <motion.h1 variants={item}>
          Customer Engagement & Product Utilization Analytics for Retention Strategy
        </motion.h1>

        <motion.p className="hero-subtitle" variants={item}>
          A behavioral-first churn analysis framework across 10,000 European banking customers — reframing attrition from demographics to transactional dynamics.
        </motion.p>

        <motion.div className="hero-pills" variants={item}>
          {HERO_PILLS.map((pill, idx) => (
            <div key={idx} className={`pill ${pill.type}`}>
              {pill.label}
            </div>
          ))}
        </motion.div>
      </motion.div>

      <div className="scroll-indicator">
        ↓ Scroll to explore
      </div>
    </section>
  );
}
