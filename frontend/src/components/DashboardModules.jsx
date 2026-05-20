import { motion } from 'framer-motion';
import { BarChart2, Layers, AlertTriangle, Activity } from 'lucide-react';
import { DASHBOARD_MODULES } from '../data/staticConstants';
import './DashboardModules.css';

const iconMap = {
  BarChart2: <BarChart2 size={20} color="var(--teal)" />,
  Layers: <Layers size={20} color="var(--teal)" />,
  Radar: <AlertTriangle size={20} color="var(--teal)" />,
  Activity: <Activity size={20} color="var(--teal)" />,
};

export default function DashboardModules() {
  return (
    <section id="modules">
      <div className="sec-header">
        <span className="sec-num">05</span>
        <span className="sec-title">Dashboard Modules</span>
      </div>

      <div className="mod-grid">
        {DASHBOARD_MODULES.map((mod) => (
          <motion.div
            key={mod.id}
            className="card module-card"
            whileHover={{ borderColor: 'rgba(20,184,166,0.4)', y: -4 }}
          >
            <div className="module-header">
              <span className="module-tag">{mod.num}</span>
              <div className="module-icon">{iconMap[mod.icon]}</div>
            </div>
            <h3 className="module-title">{mod.title}</h3>
            <p className="module-desc">{mod.desc}</p>
            <div className="module-badges">
              {mod.badges.map((badge, idx) => (
                <span key={idx} className="badge">
                  {badge}
                </span>
              ))}
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
