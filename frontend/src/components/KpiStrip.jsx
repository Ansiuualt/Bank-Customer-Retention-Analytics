import { useState, useEffect, useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import './KpiStrip.css';

const colorMap = {
  amber: 'var(--amber)',
  teal: 'var(--teal)',
  coral: 'var(--coral)',
  white: 'var(--white)',
};

function useCountUp(target, duration = 1200, triggered) {
  const [value, setValue] = useState(0);
  useEffect(() => {
    if (!triggered) return;
    const start = performance.now();
    const step = (now) => {
      const progress = Math.min((now - start) / duration, 1);
      setValue((progress * target).toFixed(2));
      if (progress < 1) requestAnimationFrame(step);
      else setValue(target.toFixed(2));
    };
    requestAnimationFrame(step);
  }, [triggered, target, duration]);
  return value;
}

function KpiCard({ kpi }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, amount: 0.5 });
  const val = useCountUp(kpi.numericValue, 1200, inView);

  const displayValue = kpi.value.replace(/[0-9.]+/, val);

  return (
    <div className="kpi-card" ref={ref}>
      <div className="kpi-label">{kpi.label}</div>
      <div className="kpi-value" style={{ color: colorMap[kpi.color] }}>
        {displayValue}
      </div>
      <div className="kpi-note">{kpi.note}</div>
      <div className="kpi-bar-bg">
        {inView && (
          <motion.div
            className="kpi-bar"
            style={{ backgroundColor: colorMap[kpi.color] }}
            initial={{ width: 0 }}
            animate={{ width: `${kpi.barWidth}%` }}
            transition={{ duration: 1.2, ease: 'easeOut', delay: 0.3 }}
          />
        )}
      </div>
    </div>
  );
}

export default function KpiStrip({ kpis }) {
  if (!kpis || kpis.length === 0) return null;
  return (
    <section className="kpi-strip-section">
      <div className="kpi-strip">
        {kpis.map((kpi) => (
          <KpiCard key={kpi.id} kpi={kpi} />
        ))}
      </div>
    </section>
  );
}
