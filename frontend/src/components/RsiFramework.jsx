import { motion } from 'framer-motion';
import { RSI_PILLARS, RSI_TIERS } from '../data/staticConstants';
import './RsiFramework.css';

export default function RsiFramework({ rsiData }) {
  if (!rsiData || !rsiData.tiers) return null;

  return (
    <section id="rsi">
      <div className="sec-header">
        <span className="sec-num">04</span>
        <span className="sec-title">RSI Framework</span>
      </div>

      <div className="formula-block">
        <div className="formula-label">RSI FORMULA</div>
        <div className="formula-text">
          <span style={{ color: 'var(--teal)' }}>RSI<sub>norm</sub></span> =
          <span style={{ color: 'var(--teal)' }}> (IsActiveMember × 30)</span> +
          <span style={{ color: 'var(--amber)' }}> (min(NumOfProducts, 4) × 15)</span> +
          <span style={{ color: 'var(--text2)' }}> (HasCrCard × 10)</span> +
          <span style={{ color: 'var(--purple)' }}> (Tenure/MaxTenure × 25)</span> +
          <span style={{ color: 'var(--green)' }}> (Balance&gt;0 × 20)</span>
          <br />
          <span style={{ color: 'var(--muted)', fontSize: '11px', display: 'inline-block', marginTop: '8px' }}>
            ÷ 1.45  →  normalized score 0–100
          </span>
        </div>
        <div className="validation-stats">
          <span style={{ color: 'var(--teal)' }}>Retained avg RSI: {rsiData.retainedAvgRsi}</span>
          <span style={{ color: 'var(--coral)' }}>Churned avg RSI: {rsiData.churnedAvgRsi}</span>
          <span style={{ color: 'var(--white)' }}>Δ = +{rsiData.delta} points</span>
        </div>
      </div>

      <div className="rsi-tiers">
        {RSI_TIERS.map((tier) => {
          const tierData = rsiData.tiers[tier.id];
          return (
            <div key={tier.id} className="card tier-card">
              <div
                className="tier-header"
                style={{ backgroundColor: tier.bgAlpha, borderColor: tier.borderAlpha }}
              >
                <div className="tier-dot" style={{ backgroundColor: tier.color }} />
                <span className="tier-name" style={{ color: tier.color }}>{tier.name}</span>
                <span className="tier-range">{tier.range}</span>
              </div>
              <div className="tier-desc">{tier.desc}</div>
              <div
                className="tier-action"
                style={{ backgroundColor: tier.actionBg, borderColor: tier.actionBorder, color: tier.color }}
              >
                {tier.action}
              </div>
              <div className="tier-stats">
                n = {tierData?.count || 0}  |  Churn = {tierData?.churnRate || 0}%
              </div>
            </div>
          );
        })}
      </div>

      <div className="pillar-grid">
        {RSI_PILLARS.map((pillar) => (
          <div key={pillar.id} className="card pillar-card">
            <div className="pillar-points" style={{ color: pillar.color }}>{pillar.points}</div>
            <div className="pillar-name">{pillar.name}</div>
            <div className="pillar-variable">{pillar.variable}</div>
            <div className="pillar-progress-bg">
              <motion.div
                className="pillar-progress-fill"
                style={{ backgroundColor: pillar.color }}
                initial={{ width: 0 }}
                whileInView={{ width: `${(pillar.points / 145) * 100}%` }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, ease: 'easeOut' }}
              />
            </div>
          </div>
        ))}
      </div>
      <div className="pillar-footer">
        Total possible: 145 points → divided by 1.45 → normalized to 100
      </div>
    </section>
  );
}
