import { motion } from 'framer-motion';
import './GeographicInsights.css';

export default function GeographicInsights({ geoData }) {
  if (!geoData || geoData.length === 0) return null;

  return (
    <section id="geography">
      <div className="sec-header">
        <span className="sec-num">06</span>
        <span className="sec-title">Geographic Insights</span>
      </div>

      <div className="geo-grid">
        {geoData.map((card) => {
          const isGermany = card.country === 'Germany';
          return (
            <div
              key={card.country}
              className={`card geo-card ${isGermany ? 'geo-outlier' : ''}`}
              style={
                isGermany
                  ? { borderColor: 'rgba(248,113,113,0.35)', borderTop: '2px solid var(--coral)' }
                  : { borderTop: `2px solid ${card.color}` }
              }
            >
              {isGermany && (
                <div className="geo-warning">⚠ Localized intervention required</div>
              )}
              
              <div className="geo-code" style={{ color: card.color }}>
                {card.code}
              </div>
              <h3 className="geo-country">{card.country}</h3>
              
              <div className="geo-churn-rate" style={{ color: card.color }}>
                {card.churnRate}%
              </div>
              
              <div className="geo-status">Status: {card.status}</div>
              <p className="geo-note">{card.note}</p>

              <div className="geo-bar-bg">
                <motion.div
                  className="geo-bar-fill"
                  style={{ backgroundColor: card.color }}
                  initial={{ width: 0 }}
                  whileInView={{ width: `${(card.churnRate / 40) * 100}%` }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.8, ease: 'easeOut' }}
                />
              </div>
            </div>
          );
        })}
      </div>

      <div className="geo-callout">
        "The 16.4 percentage point differential between Germany and the rest of the footprint cannot be dismissed as statistical noise. Germany requires highly localized behavioral interventions tailored to combat regional competitive pressures."
      </div>
    </section>
  );
}
