import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, Cell } from 'recharts';
import { ENGAGEMENT_PROFILES } from '../data/staticConstants';
import './EngagementAnalysis.css';

const riskColorMap = {
  teal: { bg: 'rgba(20,184,166,0.1)', color: 'var(--teal)', border: 'rgba(20,184,166,0.25)' },
  amber: { bg: 'rgba(245,166,35,0.1)', color: 'var(--amber)', border: 'rgba(245,166,35,0.25)' },
  coral: { bg: 'rgba(248,113,113,0.1)', color: 'var(--coral)', border: 'rgba(248,113,113,0.25)' },
};

function CustomTooltip({ active, payload }) {
  if (!active || !payload?.length) return null;
  return (
    <div className="custom-tooltip">
      <div className="tooltip-label">{payload[0].payload.segment}</div>
      <div className="tooltip-value" style={{ color: payload[0].payload.fill }}>
        {payload[0].value}%
      </div>
    </div>
  );
}

export default function EngagementAnalysis({ engagementData }) {
  return (
    <section id="engagement">
      <div className="sec-header">
        <span className="sec-num">02</span>
        <span className="sec-title">Engagement Analysis</span>
      </div>

      <div className="engagement-layout">
        <div className="engagement-chart-col">
          <div className="chart-callout">
            <div className="callout-label">Engagement Retention Gap</div>
            <div className="callout-value">+12.6pp</div>
            <div className="callout-note">Active vs Inactive members</div>
          </div>
          <div className="chart-container">
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={engagementData} layout="vertical" margin={{ top: 0, right: 30, left: 0, bottom: 0 }}>
                <XAxis type="number" domain={[0, 30]} stroke="var(--border)" tick={{ fill: 'var(--muted)', fontSize: 11 }} />
                <YAxis dataKey="segment" type="category" stroke="none" tick={{ fill: 'var(--text2)', fontSize: 11 }} width={120} />
                <Tooltip cursor={{ fill: 'rgba(255,255,255,0.02)' }} content={<CustomTooltip />} />
                <Bar dataKey="churnRate" radius={[0, 4, 4, 0]} barSize={24}>
                  {engagementData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.fill} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="engagement-profiles-col">
          {ENGAGEMENT_PROFILES.map((profile, idx) => (
            <div key={idx} className="profile-card card">
              <div className="profile-header">
                <span className="profile-name">{profile.name}</span>
                <span
                  className="profile-risk-badge"
                  style={{
                    backgroundColor: riskColorMap[profile.riskColor].bg,
                    color: riskColorMap[profile.riskColor].color,
                    borderColor: riskColorMap[profile.riskColor].border,
                  }}
                >
                  {profile.risk}
                </span>
              </div>
              <div className="profile-desc">{profile.desc}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
