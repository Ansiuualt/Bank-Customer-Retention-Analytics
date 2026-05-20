import { motion } from 'framer-motion';
import { PIPELINE_STAGES } from '../data/staticConstants';
import './Pipeline.css';

const containerVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.08 } },
};

const itemVariants = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: 'easeOut' } },
};

const accentColorMap = {
  teal: 'var(--teal)',
  amber: 'var(--amber)',
  coral: 'var(--coral)',
};

function PipeArrow() {
  return (
    <div className="pipe-arrow" aria-hidden="true">→</div>
  );
}

function StageCard({ stage }) {
  const hoverColor = accentColorMap[stage.accentColor];
  
  return (
    <motion.div
      className="pipe-stage card"
      variants={itemVariants}
      whileHover={{ y: -4, borderColor: hoverColor }}
    >
      <div className="stage-num" style={{ color: hoverColor }}>
        STAGE {stage.num} ·
      </div>
      <div className="stage-title">{stage.title}</div>
      <div className="stage-desc">{stage.desc}</div>
    </motion.div>
  );
}

export default function Pipeline() {
  return (
    <section id="pipeline">
      <div className="sec-header">
        <span className="sec-num">01</span>
        <span className="sec-title">Analytical Pipeline</span>
      </div>
      
      <motion.div 
        className="pipeline"
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.2 }}
      >
        {PIPELINE_STAGES.map((stage, idx) => (
          <div key={stage.num} style={{ display: 'flex', flex: 1 }}>
            <StageCard stage={stage} />
            {idx < PIPELINE_STAGES.length - 1 && <PipeArrow />}
          </div>
        ))}
      </motion.div>
    </section>
  );
}
