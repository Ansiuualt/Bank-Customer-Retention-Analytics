import { TECH_STACK } from '../data/staticConstants';
import './TechStack.css';

export default function TechStack() {
  return (
    <section id="stack" className="tech-stack-section">
      <div className="tech-stack-container">
        <div className="tech-label">BUILT WITH</div>
        <div className="tech-chips">
          {TECH_STACK.map((tech) => (
            <div key={tech} className="tech-chip">
              {tech}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
