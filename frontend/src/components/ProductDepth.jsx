import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, Cell, ReferenceLine } from 'recharts';
import './ProductDepth.css';

function CustomTooltip({ active, payload }) {
  if (!active || !payload?.length) return null;
  return (
    <div className="custom-tooltip">
      <div className="tooltip-label">{payload[0].payload.products}</div>
      <div className="tooltip-value" style={{ color: payload[0].payload.fill }}>
        {payload[0].value}%
      </div>
      <div className="tooltip-note" style={{ color: 'var(--muted)', fontSize: '10px', marginTop: '4px' }}>
        n={payload[0].payload.count}
      </div>
    </div>
  );
}

const CustomizedLabel = (props) => {
  const { x, y, width, value, fill, label } = props;
  return (
    <g>
      <text x={x + width / 2} y={y - 14} fill="var(--white)" textAnchor="middle" dominantBaseline="middle" fontSize={12} fontFamily="var(--font-mono)">
        {value}%
      </text>
      <text x={x + width / 2} y={y - 4} fill={fill} textAnchor="middle" dominantBaseline="middle" fontSize={10}>
        {label}
      </text>
    </g>
  );
};

export default function ProductDepth({ productDepthData }) {
  return (
    <section id="products">
      <div className="sec-header">
        <span className="sec-num">03</span>
        <span className="sec-title">Product Depth Paradox</span>
      </div>

      <div className="product-intro">
        "Conventional banking assumes maximum cross-selling guarantees maximum retention. The data proves otherwise — revealing a severe Product Depth Paradox."
      </div>

      <div className="product-chart">
        <ResponsiveContainer width="100%" height={320}>
          <BarChart data={productDepthData} margin={{ top: 30, right: 0, left: 0, bottom: 20 }}>
            <XAxis dataKey="products" stroke="var(--border)" tick={{ fill: 'var(--muted)', fontSize: 11 }} />
            <YAxis type="number" domain={[0, 100]} stroke="var(--border)" tick={{ fill: 'var(--muted)', fontSize: 11 }} />
            <Tooltip cursor={{ fill: 'rgba(255,255,255,0.02)' }} content={<CustomTooltip />} />
            <ReferenceLine y={20.4} stroke="var(--amber)" strokeDasharray="4 4" label={{ value: 'Global avg 20.4%', fill: 'var(--amber)', fontSize: 10, fontFamily: 'var(--font-mono)', position: 'insideTopLeft' }} />
            <Bar dataKey="churnRate" radius={[4, 4, 0, 0]} barSize={60} label={<CustomizedLabel />}>
              {productDepthData.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={entry.fill} />
              ))}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </div>

      <div className="product-callouts mod-grid">
        <div className="card card-accent" style={{ '--accent-color': 'var(--teal)' }}>
          <h3 style={{ fontSize: '13px', marginBottom: '8px' }}>Two-Product Sweet Spot</h3>
          <p style={{ fontSize: '12px', color: 'var(--text2)' }}>
            At exactly 2 products, churn drops to its absolute minimum of <strong style={{ color: 'var(--white)' }}>7.6%</strong> — less than half the global average. Pairing a primary checking account with one functional secondary product establishes a transactional anchor without overwhelming the customer.
          </p>
        </div>
        <div className="card card-accent" style={{ '--accent-color': 'var(--coral)' }}>
          <h3 style={{ fontSize: '13px', marginBottom: '8px' }}>Product Overloading Paradox</h3>
          <p style={{ fontSize: '12px', color: 'var(--text2)' }}>
            Customers with 3 or 4 products show dramatically elevated churn. Forced non-functional products create cognitive friction, administrative bloat, and resentment. They actively accelerate departure.
          </p>
        </div>
      </div>
    </section>
  );
}
